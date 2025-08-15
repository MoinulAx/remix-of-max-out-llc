-- Add one more marketing service
INSERT INTO public.services (title, description, category, features, starting_price, display_order) VALUES
('Email Marketing Campaigns', 'Professional email marketing designs and templates for better engagement', 'marketing', '{"Custom templates", "Mobile responsive", "A/B testing ready", "Analytics integration"}', 'From $250', 4);

-- Remove UI/UX Consulting to make web services even (4)
UPDATE public.services 
SET is_active = false 
WHERE title = 'UI/UX Consulting' AND category = 'web';