import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface PortfolioCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PortfolioAlbum {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  person: string | null;
  cover_image: string | null;
  description: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PortfolioItem {
  id: string;
  album_id: string | null;
  category_id: string;
  title: string;
  description: string | null;
  image_url: string;
  alt_text: string | null;
  display_order: number;
  is_active: boolean;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export const usePortfolioCategories = () => {
  return useQuery({
    queryKey: ['portfolio-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) {
        throw new Error(error.message);
      }

      return data as PortfolioCategory[];
    },
  });
};

export const usePortfolioAlbums = (categoryId?: string) => {
  return useQuery({
    queryKey: ['portfolio-albums', categoryId],
    queryFn: async () => {
      let query = supabase
        .from('portfolio_albums')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return data as PortfolioAlbum[];
    },
  });
};

export const usePortfolioItems = (albumId?: string, categoryId?: string) => {
  return useQuery({
    queryKey: ['portfolio-items', albumId, categoryId],
    queryFn: async () => {
      let query = supabase
        .from('portfolio_items')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (albumId) {
        query = query.eq('album_id', albumId);
      } else if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return data as PortfolioItem[];
    },
  });
};

export const usePortfolioAlbumsByCategory = (categorySlug: string) => {
  return useQuery({
    queryKey: ['portfolio-albums-by-category', categorySlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_albums')
        .select(`
          *,
          portfolio_categories!inner(slug)
        `)
        .eq('portfolio_categories.slug', categorySlug)
        .eq('is_active', true)
        .order('display_order');

      if (error) {
        throw new Error(error.message);
      }

      return data as PortfolioAlbum[];
    },
  });
};