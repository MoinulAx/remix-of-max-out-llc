-- Create table for storing quote requests
CREATE TABLE public.quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_type TEXT NOT NULL,
  message TEXT,
  budget_range TEXT,
  project_timeline TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'in_progress', 'completed', 'declined'))
);

-- Enable Row Level Security
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert quote requests (public form)
CREATE POLICY "Anyone can submit quote requests" 
ON public.quote_requests 
FOR INSERT 
WITH CHECK (true);

-- Create policy for viewing quote requests (admin only for now)
CREATE POLICY "Admin can view all quote requests" 
ON public.quote_requests 
FOR SELECT 
USING (false); -- Will need to be updated when admin authentication is implemented

-- Create index for better performance
CREATE INDEX idx_quote_requests_created_at ON public.quote_requests(created_at DESC);
CREATE INDEX idx_quote_requests_status ON public.quote_requests(status);