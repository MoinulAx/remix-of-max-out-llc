-- Add description + thumbnail_url to content_hub_posts for press articles and story bubbles
ALTER TABLE public.content_hub_posts ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.content_hub_posts ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- Add partner_type to partners to distinguish companies vs individuals
ALTER TABLE public.partners ADD COLUMN IF NOT EXISTS partner_type TEXT DEFAULT 'company';
