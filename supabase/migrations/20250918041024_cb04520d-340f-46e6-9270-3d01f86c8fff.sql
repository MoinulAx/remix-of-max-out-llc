-- Add some initial portfolio items to populate the empty albums
INSERT INTO public.portfolio_items (category_id, album_id, title, description, image_url, alt_text, display_order)
SELECT 
  c.id as category_id,
  a.id as album_id,
  'Creative Portrait ' || generate_series(1, 3) as title,
  'Professional portrait photography showcasing creative vision and technical excellence.' as description,
  CASE generate_series(1, 3)
    WHEN 1 THEN '/lovable-uploads/135A8314.jpg'
    WHEN 2 THEN '/lovable-uploads/135A8318.jpg'
    WHEN 3 THEN '/lovable-uploads/135A8479.jpg'
  END as image_url,
  'Professional portrait photography by RummSpace' as alt_text,
  generate_series(1, 3) as display_order
FROM public.portfolio_categories c
JOIN public.portfolio_albums a ON a.category_id = c.id
WHERE c.slug = 'photography' AND a.slug = 'rummspace-creative'
CROSS JOIN generate_series(1, 3);

-- Add more items to the event photography album
INSERT INTO public.portfolio_items (category_id, album_id, title, description, image_url, alt_text, display_order)
SELECT 
  c.id as category_id,
  a.id as album_id,
  'Event Photo ' || generate_series(1, 4) as title,
  'Capturing special moments and memorable events with professional quality.' as description,
  CASE generate_series(1, 4)
    WHEN 1 THEN '/lovable-uploads/135A8916.jpg'
    WHEN 2 THEN '/lovable-uploads/135A8948.jpg'
    WHEN 3 THEN '/lovable-uploads/135A9034.jpg'
    WHEN 4 THEN '/lovable-uploads/DSC_6799.jpg'
  END as image_url,
  'Professional event photography by RummSpace' as alt_text,
  generate_series(1, 4) as display_order
FROM public.portfolio_categories c
JOIN public.portfolio_albums a ON a.category_id = c.id
WHERE c.slug = 'photography' AND a.slug = 'event-photography'
CROSS JOIN generate_series(1, 4);

-- Add items to the portrait sessions album
INSERT INTO public.portfolio_items (category_id, album_id, title, description, image_url, alt_text, display_order)
SELECT 
  c.id as category_id,
  a.id as album_id,
  'Portrait Session ' || generate_series(1, 3) as title,
  'Intimate portrait sessions showcasing personality and style.' as description,
  CASE generate_series(1, 3)
    WHEN 1 THEN '/lovable-uploads/DSC_6828.jpg'
    WHEN 2 THEN '/lovable-uploads/RAL_1306.jpg'
    WHEN 3 THEN '/lovable-uploads/RAL_1307.jpg'
  END as image_url,
  'Professional portrait session by RummSpace' as alt_text,
  generate_series(1, 3) as display_order
FROM public.portfolio_categories c
JOIN public.portfolio_albums a ON a.category_id = c.id
WHERE c.slug = 'photography' AND a.slug = 'portrait-sessions'
CROSS JOIN generate_series(1, 3);

-- Add some web development portfolio items
INSERT INTO public.portfolio_items (category_id, title, description, image_url, alt_text, display_order)
SELECT 
  c.id as category_id,
  'E-commerce Platform' as title,
  'Modern e-commerce solution with advanced features and seamless user experience.' as description,
  '/lovable-uploads/RAL_1399.jpg' as image_url,
  'E-commerce platform project by RummSpace' as alt_text,
  1 as display_order
FROM public.portfolio_categories c
WHERE c.slug = 'web-projects';

INSERT INTO public.portfolio_items (category_id, title, description, image_url, alt_text, display_order)
SELECT 
  c.id as category_id,
  'Creative Portfolio Website' as title,
  'Stunning portfolio website showcasing artistic work with modern design principles.' as description,
  '/lovable-uploads/RAL_1405.jpg' as image_url,
  'Portfolio website project by RummSpace' as alt_text,
  2 as display_order
FROM public.portfolio_categories c
WHERE c.slug = 'web-projects';

INSERT INTO public.portfolio_items (category_id, title, description, image_url, alt_text, display_order)
SELECT 
  c.id as category_id,
  'Business Website' as title,
  'Professional business website with optimized performance and conversion focus.' as description,
  '/lovable-uploads/RAL_1408.jpg' as image_url,
  'Business website project by RummSpace' as alt_text,
  3 as display_order
FROM public.portfolio_categories c
WHERE c.slug = 'web-projects';