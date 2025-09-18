-- Add portfolio items for RummSpace Creative Work album
WITH photography_category AS (
  SELECT id FROM public.portfolio_categories WHERE slug = 'photography'
),
rummspace_album AS (
  SELECT id FROM public.portfolio_albums WHERE slug = 'rummspace-creative'
)
INSERT INTO public.portfolio_items (category_id, album_id, title, description, image_url, alt_text, display_order)
VALUES 
  ((SELECT id FROM photography_category), (SELECT id FROM rummspace_album), 'Creative Portrait 1', 'Professional portrait photography showcasing creative vision and technical excellence.', '/lovable-uploads/135A8314.jpg', 'Professional portrait photography by RummSpace', 1),
  ((SELECT id FROM photography_category), (SELECT id FROM rummspace_album), 'Creative Portrait 2', 'Professional portrait photography showcasing creative vision and technical excellence.', '/lovable-uploads/135A8318.jpg', 'Professional portrait photography by RummSpace', 2),
  ((SELECT id FROM photography_category), (SELECT id FROM rummspace_album), 'Creative Portrait 3', 'Professional portrait photography showcasing creative vision and technical excellence.', '/lovable-uploads/135A8479.jpg', 'Professional portrait photography by RummSpace', 3);

-- Add portfolio items for Event Photography album
WITH photography_category AS (
  SELECT id FROM public.portfolio_categories WHERE slug = 'photography'
),
event_album AS (
  SELECT id FROM public.portfolio_albums WHERE slug = 'event-photography'
)
INSERT INTO public.portfolio_items (category_id, album_id, title, description, image_url, alt_text, display_order)
VALUES 
  ((SELECT id FROM photography_category), (SELECT id FROM event_album), 'Event Photo 1', 'Capturing special moments and memorable events with professional quality.', '/lovable-uploads/135A8916.jpg', 'Professional event photography by RummSpace', 1),
  ((SELECT id FROM photography_category), (SELECT id FROM event_album), 'Event Photo 2', 'Capturing special moments and memorable events with professional quality.', '/lovable-uploads/135A8948.jpg', 'Professional event photography by RummSpace', 2),
  ((SELECT id FROM photography_category), (SELECT id FROM event_album), 'Event Photo 3', 'Capturing special moments and memorable events with professional quality.', '/lovable-uploads/135A9034.jpg', 'Professional event photography by RummSpace', 3),
  ((SELECT id FROM photography_category), (SELECT id FROM event_album), 'Event Photo 4', 'Capturing special moments and memorable events with professional quality.', '/lovable-uploads/DSC_6799.jpg', 'Professional event photography by RummSpace', 4);

-- Add portfolio items for Portrait Sessions album
WITH photography_category AS (
  SELECT id FROM public.portfolio_categories WHERE slug = 'photography'
),
portrait_album AS (
  SELECT id FROM public.portfolio_albums WHERE slug = 'portrait-sessions'
)
INSERT INTO public.portfolio_items (category_id, album_id, title, description, image_url, alt_text, display_order)
VALUES 
  ((SELECT id FROM photography_category), (SELECT id FROM portrait_album), 'Portrait Session 1', 'Intimate portrait sessions showcasing personality and style.', '/lovable-uploads/DSC_6828.jpg', 'Professional portrait session by RummSpace', 1),
  ((SELECT id FROM photography_category), (SELECT id FROM portrait_album), 'Portrait Session 2', 'Intimate portrait sessions showcasing personality and style.', '/lovable-uploads/RAL_1306.jpg', 'Professional portrait session by RummSpace', 2),
  ((SELECT id FROM photography_category), (SELECT id FROM portrait_album), 'Portrait Session 3', 'Intimate portrait sessions showcasing personality and style.', '/lovable-uploads/RAL_1307.jpg', 'Professional portrait session by RummSpace', 3);

-- Add web development portfolio items
WITH web_category AS (
  SELECT id FROM public.portfolio_categories WHERE slug = 'web-projects'
)
INSERT INTO public.portfolio_items (category_id, title, description, image_url, alt_text, display_order)
VALUES 
  ((SELECT id FROM web_category), 'E-commerce Platform', 'Modern e-commerce solution with advanced features and seamless user experience.', '/lovable-uploads/RAL_1399.jpg', 'E-commerce platform project by RummSpace', 1),
  ((SELECT id FROM web_category), 'Creative Portfolio Website', 'Stunning portfolio website showcasing artistic work with modern design principles.', '/lovable-uploads/RAL_1405.jpg', 'Portfolio website project by RummSpace', 2),
  ((SELECT id FROM web_category), 'Business Website', 'Professional business website with optimized performance and conversion focus.', '/lovable-uploads/RAL_1408.jpg', 'Business website project by RummSpace', 3);