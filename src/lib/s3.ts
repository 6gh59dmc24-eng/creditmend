import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || '';

export interface UploadFileParams {
  file: Buffer;
  fileName: string;
  contentType: string;
  folder?: string;
  metadata?: Record<string, string>;
}

export interface UploadResult {
  key: string;
  url: string;
  bucket: string;
}

/**
 * Upload a file to S3
 */
export async function uploadFile({
  file,
  fileName,
  contentType,
  folder = 'documents',
  metadata = {},
}: UploadFileParams): Promise<UploadResult> {
  const key = folder ? `${folder}/${fileName}` : fileName;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: contentType,
    Metadata: metadata,
  });

  await s3Client.send(command);

  return {
    key,
    url: `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
    bucket: BUCKET_NAME,
  };
}

/**
 * Generate a presigned URL for downloading a file
 * @param key - The S3 object key
 * @param expiresIn - URL expiration time in seconds (default: 1 hour)
 */
export async function getPresignedDownloadUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  return await getSignedUrl(s3Client, command, { expiresIn });
}

/**
 * Generate a presigned URL for uploading a file
 * @param key - The S3 object key
 * @param contentType - The content type of the file
 * @param expiresIn - URL expiration time in seconds (default: 15 minutes)
 */
export async function getPresignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn: number = 900
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  return await getSignedUrl(s3Client, command, { expiresIn });
}

/**
 * Delete a file from S3
 */
export async function deleteFile(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  await s3Client.send(command);
}

/**
 * Check if a file exists in S3
 */
export async function fileExists(key: string): Promise<boolean> {
  try {
    const command = new HeadObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * List files in a folder
 */
export async function listFiles(
  folder: string,
  maxKeys: number = 1000
): Promise<string[]> {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
    Prefix: folder,
    MaxKeys: maxKeys,
  });

  const response = await s3Client.send(command);
  return response.Contents?.map((item) => item.Key || '') || [];
}

/**
 * Get file metadata
 */
export async function getFileMetadata(key: string) {
  const command = new HeadObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  const response = await s3Client.send(command);
  return {
    contentType: response.ContentType,
    contentLength: response.ContentLength,
    lastModified: response.LastModified,
    metadata: response.Metadata,
  };
}

/**
 * Download a file from S3
 */
export async function downloadFile(key: string): Promise<Buffer> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  const response = await s3Client.send(command);

  if (!response.Body) {
    throw new Error('No file content received');
  }

  const chunks: Uint8Array[] = [];
  for await (const chunk of response.Body as any) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
}

export { s3Client, BUCKET_NAME };
