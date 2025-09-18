import { supabase } from '@/integrations/supabase/client';

export const getImageUrl = (path: string) => {
  // If it's already a full URL or starts with /, return as is
  if (path.startsWith('http') || path.startsWith('/')) {
    return path;
  }
  
  // If it's a Supabase storage path, get the public URL
  const { data } = supabase.storage
    .from('portfolio')
    .getPublicUrl(path);
  
  console.log('Image path:', path, 'Generated URL:', data.publicUrl);
  return data.publicUrl;
};

export const uploadPortfolioImage = async (file: File, path: string) => {
  const { data, error } = await supabase.storage
    .from('portfolio')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deletePortfolioImage = async (path: string) => {
  const { error } = await supabase.storage
    .from('portfolio')
    .remove([path]);

  if (error) {
    throw new Error(error.message);
  }
};