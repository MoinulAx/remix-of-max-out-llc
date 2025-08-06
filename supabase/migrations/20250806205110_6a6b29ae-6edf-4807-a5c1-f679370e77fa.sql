-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false);

-- Create policies for resume uploads
CREATE POLICY "Anyone can upload resumes" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Admin can view all resumes" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'resumes');