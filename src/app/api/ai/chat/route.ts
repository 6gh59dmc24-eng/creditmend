import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getChatResponse } from '@/lib/ai';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    // Check authentication
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { message, sessionId } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // 1. Find or create chat session
    let currentSessionId = sessionId;
    if (!currentSessionId) {
      const newSession = await prisma.chatSession.create({
        data: {
          userId: userId,
          title: 'Financial Coaching',
        },
      });
      currentSessionId = newSession.id;
    }

    // 2. Save user message
    await prisma.chatMessage.create({
      data: {
        sessionId: currentSessionId,
        role: 'user',
        content: message,
      },
    });

    // 3. Get Chat History for context (last 10 messages)
    const history = await prisma.chatMessage.findMany({
      where: { sessionId: currentSessionId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    // Format for OpenAI API (reverse chronological order from DB needs to be flipped)
    const apiMessages = history.reverse().map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }));

    // 4. Get AI Response
    const aiResponseContent = await getChatResponse(apiMessages);

    // 5. Save AI Response
    const aiMessage = await prisma.chatMessage.create({
      data: {
        sessionId: currentSessionId,
        role: 'assistant',
        content: aiResponseContent,
      },
    });

    return NextResponse.json({
      sessionId: currentSessionId,
      message: aiMessage,
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
