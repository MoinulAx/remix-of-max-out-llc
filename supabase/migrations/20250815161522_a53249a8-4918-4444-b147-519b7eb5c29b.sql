-- Create service_categories enum
CREATE TYPE public.service_category AS ENUM ('media', 'web', 'marketing');

-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category service_category NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  starting_price TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Services are viewable by everyone" 
ON public.services 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage services" 
ON public.services 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial services data
INSERT INTO public.services (title, description, category, features, starting_price, display_order) VALUES
-- Media services
('Portrait Photography', 'Professional headshots and personal portraits that capture your unique personality', 'media', '{"Studio or location shoots", "Professional retouching", "Multiple outfit changes", "High-resolution files"}', 'From $200', 1),
('Event Photography', 'Complete event coverage for weddings, corporate events, and special occasions', 'media', '{"Full event coverage", "Candid and posed shots", "Online gallery delivery", "Print release included"}', 'From $500', 2),
('Product Photography', 'High-quality product shots for e-commerce, catalogs, and marketing materials', 'media', '{"Studio lighting setup", "Multiple angles", "Lifestyle and clean shots", "Same-day turnaround"}', 'From $150', 3),
('Photo Editing', 'Professional post-processing and retouching services', 'media', '{"Color correction", "Background removal", "Skin retouching", "Batch processing"}', 'From $25/photo', 4),

-- Web services
('Website Design', 'Custom websites that perfectly represent your brand and convert visitors', 'web', '{"Responsive design", "SEO optimization", "Content management", "Performance optimization"}', 'From $1,500', 1),
('Personal Websites', 'Beautiful personal websites for portfolios, blogs, and professional presence', 'web', '{"Custom design", "Mobile responsive", "Fast loading", "Easy to update"}', 'From $800', 2),
('E-commerce Development', 'Online stores built for sales with secure payment processing', 'web', '{"Payment integration", "Inventory management", "Mobile optimization", "Analytics setup"}', 'From $2,500', 3),
('Brand & Logo Design', 'Complete brand identity packages that make you stand out', 'web', '{"Logo design", "Brand guidelines", "Business cards", "Social media kit"}', 'From $800', 4),
('UI/UX Consulting', 'User experience optimization for better engagement and conversions', 'web', '{"User research", "Wireframing", "Prototype testing", "Design systems"}', 'From $150/hour', 5),

-- Marketing services  
('Custom Posters', 'Eye-catching poster designs for events, promotions, and businesses', 'marketing', '{"High-resolution designs", "Print-ready files", "Multiple size options", "Revisions included"}', 'From $150', 1),
('Social Media Graphics', 'Engaging visual content for all your social media platforms', 'marketing', '{"Platform-specific sizes", "Brand consistency", "Template packages", "Quick turnaround"}', 'From $100', 2),
('Marketing Materials', 'Comprehensive marketing collateral including flyers, brochures, and banners', 'marketing', '{"Professional design", "Print consultation", "Digital and print formats", "Brand alignment"}', 'From $200', 3);