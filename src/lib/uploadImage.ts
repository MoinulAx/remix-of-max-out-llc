import { supabase } from '@/integrations/supabase/client';

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'file';

/**
 * Upload a file to a public storage bucket and return its public URL.
 * Throws on error so callers can surface a toast.
 */
export async function uploadImage(
  bucket: string,
  file: File
): Promise<string> {
  const ext = file.name.includes('.') ? file.name.split('.').pop() : 'bin';
  const baseName = file.name.replace(/\.[^.]+$/, '');
  const path = `${Date.now()}-${slugify(baseName)}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file, { cacheControl: '3600', upsert: false });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}