-- Update portfolio items with organized, descriptive image names
-- Keep folder structure but use professional naming convention

-- Creative Portfolio Images
UPDATE portfolio_items 
SET 
  image_url = 'creative/rummspace-creative-portrait-01.jpg',
  title = 'Professional Creative Portrait',
  description = 'Artistic portrait photography showcasing creative lighting and composition'
WHERE image_url = 'creative/135A8314.jpg';

UPDATE portfolio_items 
SET 
  image_url = 'creative/rummspace-creative-portrait-02.jpg',
  title = 'Artistic Portrait Session',
  description = 'Creative portrait with dramatic lighting and professional styling'
WHERE image_url = 'creative/135A8318.jpg';

UPDATE portfolio_items 
SET 
  image_url = 'creative/rummspace-creative-portrait-03.jpg',
  title = 'Studio Creative Work',
  description = 'Professional studio portrait with artistic direction and composition'
WHERE image_url = 'creative/135A8479.jpg';

-- Event Photography Images
UPDATE portfolio_items 
SET 
  image_url = 'events/rummspace-event-celebration-01.jpg',
  title = 'Event Celebration Photography',
  description = 'Professional event coverage capturing memorable moments and celebrations'
WHERE image_url = 'events/135A8916.jpg';

UPDATE portfolio_items 
SET 
  image_url = 'events/rummspace-event-celebration-02.jpg',
  title = 'Corporate Event Coverage',
  description = 'Dynamic event photography showcasing atmosphere and key moments'
WHERE image_url = 'events/135A8948.jpg';

UPDATE portfolio_items 
SET 
  image_url = 'events/rummspace-event-celebration-03.jpg',
  title = 'Special Event Documentation',
  description = 'Comprehensive event photography with attention to detail and emotion'
WHERE image_url = 'events/135A9034.jpg';

UPDATE portfolio_items 
SET 
  image_url = 'events/rummspace-event-celebration-04.jpg',
  title = 'Event Highlight Capture',
  description = 'Professional documentation of key event moments and interactions'
WHERE image_url = 'events/DSC_6799.jpg';

-- Portrait Session Images
UPDATE portfolio_items 
SET 
  image_url = 'portraits/rummspace-portrait-session-01.jpg',
  title = 'Professional Portrait Session',
  description = 'Classic portrait photography with professional lighting and composition'
WHERE image_url = 'portraits/DSC_6828.jpg';

UPDATE portfolio_items 
SET 
  image_url = 'portraits/rummspace-portrait-session-02.jpg',
  title = 'Executive Portrait Photography',
  description = 'Professional headshot and portrait session for business profiles'
WHERE image_url = 'portraits/RAL_1306.jpg';

UPDATE portfolio_items 
SET 
  image_url = 'portraits/rummspace-portrait-session-03.jpg',
  title = 'Personal Branding Portrait',
  description = 'Professional portrait session focused on personal branding and style'
WHERE image_url = 'portraits/RAL_1307.jpg';

-- Web Development Project Images
UPDATE portfolio_items 
SET 
  image_url = 'web/rummspace-web-ecommerce-platform.jpg',
  title = 'E-commerce Platform Development',
  description = 'Custom e-commerce solution with modern design and full functionality'
WHERE image_url = 'web/RAL_1399.jpg';

UPDATE portfolio_items 
SET 
  image_url = 'web/rummspace-web-portfolio-website.jpg',
  title = 'Creative Portfolio Website',
  description = 'Responsive portfolio website with modern design and optimized performance'
WHERE image_url = 'web/RAL_1405.jpg';

UPDATE portfolio_items 
SET 
  image_url = 'web/rummspace-web-business-site.jpg',
  title = 'Professional Business Website',
  description = 'Corporate website with professional design and comprehensive functionality'
WHERE image_url = 'web/RAL_1408.jpg';