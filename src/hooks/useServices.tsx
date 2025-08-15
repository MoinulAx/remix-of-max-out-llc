import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type ServiceCategory = 'media' | 'web' | 'marketing';

export interface Service {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  features: string[];
  starting_price: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('category')
        .order('display_order');

      if (error) {
        throw new Error(error.message);
      }

      return data as Service[];
    },
  });
};

export const useServicesByCategory = (category: ServiceCategory) => {
  return useQuery({
    queryKey: ['services', category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('category', category)
        .eq('is_active', true)
        .order('display_order');

      if (error) {
        throw new Error(error.message);
      }

      return data as Service[];
    },
  });
};