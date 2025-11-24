import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { auth } from '@/lib/auth';

const UPLOAD_DIR = './uploads';
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Generate unique filename
function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const extension = originalName.split('.').pop();
  const nameWithoutExt = originalName.split('.').slice(0, -1).join('.');
  return `${nameWithoutExt}_${timestamp}.${extension}`;
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const caseId = formData.get('caseId') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            'Invalid file type. Only PDF, JPG, PNG, and Word documents are allowed.',
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: 'File too large. Maximum size is 10MB.',
        },
        { status: 400 }
      );
    }

    // Ensure upload directory exists
    await mkdir(UPLOAD_DIR, { recursive: true });

    // Generate unique filename
    const uniqueFilename = generateUniqueFilename(file.name);
    const filePath = join(UPLOAD_DIR, uniqueFilename);

    // Save file to disk
    const buffer = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(buffer));

    // TODO: Save to database using Prisma
    // await prisma.document.create({ data: fileMetadata })

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        id: Math.random().toString(36).substring(2, 15),
        fileName: uniqueFilename,
        originalName: file.name,
        size: file.size,
        type: file.type,
        category: category,
        uploadDate: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

// Get list of documents for a user
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const category = url.searchParams.get('category') as string;

    // TODO: Fetch documents from database
    // const documents = await prisma.document.findMany({
    //   where: {
    //     clientId: session.user.id,
    //     ...(category && category !== "all" && { category })
    //   },
    //   orderBy: { createdAt: "desc" }
    // })

    // Mock data for now
    const mockDocuments = [
      {
        id: '1',
        fileName: 'credit_report_experian_20240115.pdf',
        originalName: 'credit_report_experian.pdf',
        fileType: 'application/pdf',
        fileSize: 2048576,
        category: 'CREDIT_REPORT',
        description: 'Latest credit report from Experian',
        uploadDate: '2024-01-15T10:30:00Z',
        isEncrypted: true,
      },
      {
        id: '2',
        fileName: 'government_id_20240110.jpg',
        originalName: 'government_id.jpg',
        fileType: 'image/jpeg',
        fileSize: 524288,
        category: 'ID_VERIFICATION',
        description: 'Government issued ID for verification',
        uploadDate: '2024-01-10T14:15:00Z',
        isEncrypted: true,
      },
    ];

    // Filter by category if specified
    const filteredDocuments =
      category && category !== 'all'
        ? mockDocuments.filter(doc => doc.category === category)
        : mockDocuments;

    return NextResponse.json({
      success: true,
      documents: filteredDocuments,
    });
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}

// Delete a document
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const documentId = url.searchParams.get('id') as string;

    if (!documentId) {
      return NextResponse.json(
        { error: 'Document ID required' },
        { status: 400 }
      );
    }

    // TODO: Verify user owns the document and delete from database
    // const document = await prisma.document.findFirst({
    //   where: {
    //     id: documentId,
    //     clientId: session.user.id
    //   }
    // })

    // if (!document) {
    //   return NextResponse.json({ error: "Document not found" }, { status: 404 })
    // }

    // await prisma.document.delete({
    //   where: { id: documentId }
    // })

    // Also delete the physical file
    // const filePath = document.filePath
    // await unlink(filePath)

    return NextResponse.json({
      success: true,
      message: 'Document deleted successfully',
    });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete document' },
      { status: 500 }
    );
  }
}
