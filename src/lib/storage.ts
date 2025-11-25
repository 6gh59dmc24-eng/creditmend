import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'Credit';

export interface UploadFileParams {
  file: File | Buffer;
  fileName: string;
  folder?: string;
  contentType?: string;
  upsert?: boolean;
}

export interface UploadResult {
  path: string;
  publicUrl: string;
  bucket: string;
}

/**
 * Upload a file to Supabase Storage
 */
export async function uploadFile({
  file,
  fileName,
  folder = 'documents',
  contentType,
  upsert = false,
}: UploadFileParams): Promise<UploadResult> {
  const filePath = folder ? `${folder}/${fileName}` : fileName;

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file, {
      contentType,
      upsert,
    });

  if (error) {
    throw new Error(`Failed to upload file: ${error.message}`);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);

  return {
    path: data.path,
    publicUrl,
    bucket: STORAGE_BUCKET,
  };
}

/**
 * Get a public URL for a file
 */
export function getPublicUrl(path: string): string {
  const {
    data: { publicUrl },
  } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);

  return publicUrl;
}

/**
 * Get a signed URL for private file access
 * @param path - The file path in storage
 * @param expiresIn - URL expiration time in seconds (default: 1 hour)
 */
export async function getSignedUrl(
  path: string,
  expiresIn: number = 3600
): Promise<string> {
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(path, expiresIn);

  if (error) {
    throw new Error(`Failed to create signed URL: ${error.message}`);
  }

  return data.signedUrl;
}

/**
 * Download a file from Supabase Storage
 */
export async function downloadFile(path: string): Promise<Blob> {
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .download(path);

  if (error) {
    throw new Error(`Failed to download file: ${error.message}`);
  }

  return data;
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFile(path: string): Promise<void> {
  const { error } = await supabase.storage.from(STORAGE_BUCKET).remove([path]);

  if (error) {
    throw new Error(`Failed to delete file: ${error.message}`);
  }
}

/**
 * Delete multiple files from Supabase Storage
 */
export async function deleteFiles(paths: string[]): Promise<void> {
  const { error } = await supabase.storage.from(STORAGE_BUCKET).remove(paths);

  if (error) {
    throw new Error(`Failed to delete files: ${error.message}`);
  }
}

/**
 * List files in a folder
 */
export async function listFiles(
  folder: string = '',
  options?: {
    limit?: number;
    offset?: number;
    sortBy?: { column: string; order: 'asc' | 'desc' };
  }
) {
  const { data, error } = await supabase.storage.from(STORAGE_BUCKET).list(folder, options);

  if (error) {
    throw new Error(`Failed to list files: ${error.message}`);
  }

  return data;
}

/**
 * Move/rename a file
 */
export async function moveFile(
  fromPath: string,
  toPath: string
): Promise<void> {
  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .move(fromPath, toPath);

  if (error) {
    throw new Error(`Failed to move file: ${error.message}`);
  }
}

/**
 * Copy a file
 */
export async function copyFile(
  fromPath: string,
  toPath: string
): Promise<void> {
  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .copy(fromPath, toPath);

  if (error) {
    throw new Error(`Failed to copy file: ${error.message}`);
  }
}

/**
 * Create a new storage bucket
 */
export async function createBucket(
  bucketName: string,
  options?: {
    public?: boolean;
    fileSizeLimit?: number;
    allowedMimeTypes?: string[];
  }
) {
  const { data, error } = await supabase.storage.createBucket(bucketName, {
    public: options?.public ?? false,
    fileSizeLimit: options?.fileSizeLimit,
    allowedMimeTypes: options?.allowedMimeTypes,
  });

  if (error) {
    throw new Error(`Failed to create bucket: ${error.message}`);
  }

  return data;
}

/**
 * Get bucket details
 */
export async function getBucket(bucketName: string = STORAGE_BUCKET) {
  const { data, error } = await supabase.storage.getBucket(bucketName);

  if (error) {
    throw new Error(`Failed to get bucket: ${error.message}`);
  }

  return data;
}

/**
 * List all buckets
 */
export async function listBuckets() {
  const { data, error } = await supabase.storage.listBuckets();

  if (error) {
    throw new Error(`Failed to list buckets: ${error.message}`);
  }

  return data;
}

export { STORAGE_BUCKET };
