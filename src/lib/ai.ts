import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini Client
// You need a free API key from https://aistudio.google.com/
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'mock-key');

// System Prompts
export const SYSTEM_PROMPTS = {
  FINANCIAL_COACH: `You are an AI Financial Coach for CreditMend.
Your goal is to help users improve their credit score, manage debt, and build financial health.
Tone: Friendly, supportive, encouraging, and professional.
Capabilities:
- Analyze credit reports (if provided in context).
- Suggest debt repayment strategies (snowball, avalanche).
- Explain credit score factors (payment history, utilization, age, mix, inquiries).
- Recommend credit building tools (secured cards, credit builder loans).
- Do NOT provide legal or investment advice. Always add a disclaimer when necessary.
`,
  DISPUTE_GENERATOR: `You are an expert in credit repair laws (FCRA, FDCPA).
Your task is to generate a formal dispute letter to a credit bureau.
Input: A JSON object containing the user's details, the creditor's details, and the specific error to dispute.
Output: A professionally formatted dispute letter.
Style: Formal, assertive, but polite.
`,
};

// Helper to generate a chat response
export async function getChatResponse(
  messages: { role: 'system' | 'user' | 'assistant'; content: string }[]
) {
  if (!process.env.GEMINI_API_KEY) {
    console.warn('GEMINI_API_KEY is missing. AI features will be disabled.');
    return 'I am currently unavailable. Please configure the AI settings.';
  }

  try {
    // Gemini doesn't use a "system" role in the messages array the same way OpenAI does.
    // We prepend the system prompt to the first user message or use systemInstruction if available in newer models.
    // For simplicity with the standard model:
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const chat = model.startChat({
      history: messages
        .filter(m => m.role !== 'system') // Filter out system messages for history
        .map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
      systemInstruction: SYSTEM_PROMPTS.FINANCIAL_COACH,
    });

    // Get the last message to send (the new user prompt)
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== 'user') {
      return "I'm listening...";
    }

    const result = await chat.sendMessage(lastMessage.content);
    return result.response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    return 'Sorry, I encountered an error while processing your request.';
  }
}

// Helper to generate a dispute letter
export async function generateDisputeLetter(data: {
  userName: string;
  userAddress: string;
  bureauName: string;
  bureauAddress: string;
  accountName: string;
  accountNumber: string;
  reason: string;
}) {
  if (!process.env.GEMINI_API_KEY) {
    return 'AI service is currently unavailable.';
  }

  const prompt = `
    ${SYSTEM_PROMPTS.DISPUTE_GENERATOR}
    
    Generate a dispute letter for the following:
    User: ${data.userName}, ${data.userAddress}
    Bureau: ${data.bureauName}, ${data.bureauAddress}
    Account: ${data.accountName} (${data.accountNumber})
    Reason for dispute: ${data.reason}
    
    Please format it as a standard formal letter.
  `;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate dispute letter');
  }
}
