-- First, let's update existing services with more descriptive content and add new services

-- Update existing services with more descriptive information
UPDATE services SET 
  description = 'Cinematic storytelling through dynamic video content for events, brands, and creative projects',
  features = ARRAY['Event cinematography', 'Brand storytelling videos', 'Promotional content', 'Multi-camera setup', 'Professional audio recording', 'Color grading & editing', 'Drone footage available', 'Quick turnaround delivery']
WHERE title = 'Event Photography' AND category = 'media';

UPDATE services SET 
  title = 'Event Photography & Videography',
  description = 'Complete visual coverage combining photography and videography for unforgettable events',
  features = ARRAY['Photo & video packages', 'Event highlights reel', 'Candid moments capture', 'Professional editing', 'Online gallery delivery', 'Same-day sneak peeks', 'Multiple format delivery', 'Print release included'],
  starting_price = 'From $800'
WHERE id = '0af4567c-3250-4a9d-adc6-f187267549d0';

UPDATE services SET 
  description = 'Professional headshots and creative portraits that showcase your personality and brand',
  features = ARRAY['Studio or location shoots', 'Professional retouching', 'Multiple outfit changes', 'Lighting consultation', 'High-resolution files', 'Print ready formats', 'Social media optimization', 'Branding guidance']
WHERE title = 'Portrait Photography';

UPDATE services SET 
  description = 'High-impact product photography that drives sales and showcases your products professionally',
  features = ARRAY['Studio lighting setup', '360-degree product views', 'Lifestyle and clean shots', 'Amazon/E-commerce ready', 'Background variations', 'Props and styling', 'Fast turnaround', 'Batch processing discounts']
WHERE title = 'Product Photography';

UPDATE services SET 
  description = 'Professional photo enhancement and creative editing to make your images stand out',
  features = ARRAY['Advanced color correction', 'Background removal/replacement', 'Skin retouching & enhancement', 'Object removal/addition', 'HDR processing', 'Batch processing', 'Raw file processing', 'Creative effects']
WHERE title = 'Photo Editing';

-- Add new media services
INSERT INTO services (title, description, category, features, starting_price, display_order) VALUES
('Wedding Videography', 'Cinematic wedding films that capture every precious moment of your special day', 'media', ARRAY['Full ceremony coverage', 'Reception highlights', 'Drone footage', 'Same-day edit preview', 'Cinematic storytelling', 'Professional audio', 'Multiple camera angles', 'Custom music scoring'], 'From $1,200', 5),
('Commercial Video Production', 'High-quality promotional and advertising videos for businesses and brands', 'media', ARRAY['Script development', 'Professional lighting', 'Multi-camera production', 'Voice-over recording', 'Motion graphics', 'Brand integration', 'Social media formats', 'Analytics tracking'], 'From $2,000', 6),
('Creative Photography', 'Artistic and conceptual photography for unique visual storytelling', 'media', ARRAY['Concept development', 'Creative lighting', 'Post-processing artistry', 'Fine art prints', 'Exhibition quality', 'Limited editions', 'Artist collaboration', 'Custom framing'], 'From $300', 7);

-- Update web services with more descriptive content
UPDATE services SET 
  description = 'Custom-built websites that perfectly represent your brand and convert visitors into customers',
  features = ARRAY['Custom responsive design', 'SEO optimization', 'Content management system', 'Performance optimization', 'Security implementation', 'Analytics setup', 'Social media integration', 'Ongoing support included']
WHERE title = 'Website Design';

UPDATE services SET 
  description = 'Beautiful, professional websites for portfolios, blogs, and personal branding',
  features = ARRAY['Custom design consultation', 'Mobile-first approach', 'Fast loading optimization', 'Easy content updates', 'Contact form integration', 'Social media links', 'SEO foundation', 'Domain & hosting guidance']
WHERE title = 'Personal Websites';

UPDATE services SET 
  description = 'Complete e-commerce solutions built for maximum sales and customer satisfaction',
  features = ARRAY['Secure payment processing', 'Inventory management', 'Order tracking system', 'Mobile optimization', 'SEO for products', 'Analytics & reporting', 'Customer accounts', 'Marketing integrations']
WHERE title = 'E-commerce Development';

UPDATE services SET 
  description = 'Comprehensive brand identity packages that make your business memorable and professional',
  features = ARRAY['Logo design & variations', 'Brand color palette', 'Typography selection', 'Business card design', 'Letterhead templates', 'Social media kit', 'Brand guidelines document', 'File formats for all uses']
WHERE title = 'Brand & Logo Design';

-- Add new web services
INSERT INTO services (title, description, category, features, starting_price, display_order) VALUES
('Web Application Development', 'Custom web applications built with modern technologies for complex business needs', 'web', ARRAY['Custom functionality', 'Database design', 'User authentication', 'API integrations', 'Real-time features', 'Cloud deployment', 'Scalable architecture', 'Maintenance & updates'], 'From $5,000', 6),
('Landing Page Design', 'High-converting landing pages designed to maximize your marketing campaigns', 'web', ARRAY['Conversion optimization', 'A/B testing setup', 'Mobile responsiveness', 'Fast loading times', 'Lead capture forms', 'Analytics integration', 'CRM connections', 'Multiple variations'], 'From $600', 7),
('Website Maintenance', 'Ongoing website care to keep your site secure, updated, and performing optimally', 'web', ARRAY['Security updates', 'Content updates', 'Performance monitoring', 'Backup management', 'Bug fixes', 'SEO monitoring', 'Analytics reporting', 'Technical support'], 'From $150/month', 8);

-- Update marketing services with more descriptive content
UPDATE services SET 
  description = 'Eye-catching poster designs that grab attention and effectively communicate your message',
  features = ARRAY['High-resolution designs', 'Print-ready files', 'Multiple size options', 'Unlimited revisions', 'Rush delivery available', 'QR code integration', 'Social media versions', 'Bulk order discounts']
WHERE title = 'Custom Posters';

UPDATE services SET 
  description = 'Engaging visual content designed to boost your social media presence and engagement',
  features = ARRAY['Platform-specific sizes', 'Brand consistency', 'Template packages', 'Story & post formats', 'Animated graphics', 'Hashtag research', 'Content calendar', 'Performance tracking']
WHERE title = 'Social Media Graphics';

UPDATE services SET 
  description = 'Professional marketing materials that enhance your brand presence and drive business growth',
  features = ARRAY['Brochure design', 'Flyer creation', 'Banner design', 'Print consultation', 'Digital formats', 'Brand alignment', 'Distribution strategy', 'ROI tracking']
WHERE title = 'Marketing Materials';

-- Add new marketing services
INSERT INTO services (title, description, category, features, starting_price, display_order) VALUES
('Video Marketing Content', 'Engaging video content designed specifically for marketing campaigns and social media', 'marketing', ARRAY['Short-form video creation', 'Social media optimization', 'Brand storytelling', 'Call-to-action integration', 'Multiple platform formats', 'Performance analytics', 'Trending audio integration', 'Viral content strategy'], 'From $400', 5),
('Digital Advertising Design', 'High-converting digital ads designed for Google, Facebook, Instagram, and other platforms', 'marketing', ARRAY['Platform-specific formats', 'A/B testing variants', 'Conversion optimization', 'Brand consistency', 'Campaign strategy', 'Performance tracking', 'Target audience research', 'ROI optimization'], 'From $200', 6),
('Content Creation Strategy', 'Comprehensive content planning and creation for consistent brand messaging across all channels', 'marketing', ARRAY['Content calendar planning', 'Brand voice development', 'Multi-platform strategy', 'Engagement optimization', 'Trend analysis', 'Competitor research', 'Performance metrics', 'Monthly reporting'], 'From $800/month', 7);