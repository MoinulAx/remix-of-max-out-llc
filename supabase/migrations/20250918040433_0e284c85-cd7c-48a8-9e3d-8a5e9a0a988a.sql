-- Create storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true);

-- Create portfolio categories table
CREATE TABLE public.portfolio_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create portfolio albums table
CREATE TABLE public.portfolio_albums (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.portfolio_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  person TEXT,
  cover_image TEXT,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(category_id, slug)
);

-- Create portfolio items table
CREATE TABLE public.portfolio_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  album_id UUID REFERENCES public.portfolio_albums(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.portfolio_categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.portfolio_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Portfolio categories are viewable by everyone" 
ON public.portfolio_categories 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Portfolio albums are viewable by everyone" 
ON public.portfolio_albums 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Portfolio items are viewable by everyone" 
ON public.portfolio_items 
FOR SELECT 
USING (is_active = true);

-- Create policies for storage bucket
CREATE POLICY "Portfolio images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'portfolio');

CREATE POLICY "Authenticated users can upload portfolio images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'portfolio' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update portfolio images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'portfolio' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete portfolio images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'portfolio' AND auth.uid() IS NOT NULL);

-- Create triggers for timestamp updates
CREATE TRIGGER update_portfolio_categories_updated_at
BEFORE UPDATE ON public.portfolio_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_portfolio_albums_updated_at
BEFORE UPDATE ON public.portfolio_albums
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_portfolio_items_updated_at
BEFORE UPDATE ON public.portfolio_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial data
INSERT INTO public.portfolio_categories (name, slug, description, display_order) VALUES
('Photography', 'photography', 'Professional photography services', 1),
('Videography', 'videography', 'Video production and editing', 2),
('Web Projects', 'web-projects', 'Web development and design projects', 3);

-- Insert photography albums
INSERT INTO public.portfolio_albums (category_id, name, slug, person, cover_image, display_order) 
SELECT 
  c.id,
  'RummSpace Creative Work',
  'rummspace-creative',
  'Rummy',
  '/lovable-uploads/135A8314.jpg',
  1
FROM public.portfolio_categories c WHERE c.slug = 'photography';

INSERT INTO public.portfolio_albums (category_id, name, slug, person, cover_image, display_order) 
SELECT 
  c.id,
  'Event Photography',
  'event-photography',
  'Rummy',
  '/lovable-uploads/135A8318.jpg',
  2
FROM public.portfolio_categories c WHERE c.slug = 'photography';

INSERT INTO public.portfolio_albums (category_id, name, slug, person, cover_image, display_order) 
SELECT 
  c.id,
  'Portrait Sessions',
  'portrait-sessions',
  'Rummy',
  '/lovable-uploads/135A8479.jpg',
  3
FROM public.portfolio_categories c WHERE c.slug = 'photography';