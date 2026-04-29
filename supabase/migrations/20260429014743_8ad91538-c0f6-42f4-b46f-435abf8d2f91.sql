-- Ensure full row data is sent on UPDATE/DELETE events
ALTER TABLE public.inquiries REPLICA IDENTITY FULL;
ALTER TABLE public.applications REPLICA IDENTITY FULL;
ALTER TABLE public.job_applications REPLICA IDENTITY FULL;
ALTER TABLE public.quote_requests REPLICA IDENTITY FULL;
ALTER TABLE public.content_hub_posts REPLICA IDENTITY FULL;
ALTER TABLE public.roster REPLICA IDENTITY FULL;
ALTER TABLE public.careers REPLICA IDENTITY FULL;
ALTER TABLE public.partners REPLICA IDENTITY FULL;

-- Add tables to the realtime publication (idempotent — ignore if already added)
DO $$
BEGIN
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.inquiries; EXCEPTION WHEN duplicate_object THEN NULL; END;
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.applications; EXCEPTION WHEN duplicate_object THEN NULL; END;
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.job_applications; EXCEPTION WHEN duplicate_object THEN NULL; END;
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.quote_requests; EXCEPTION WHEN duplicate_object THEN NULL; END;
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.content_hub_posts; EXCEPTION WHEN duplicate_object THEN NULL; END;
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.roster; EXCEPTION WHEN duplicate_object THEN NULL; END;
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.careers; EXCEPTION WHEN duplicate_object THEN NULL; END;
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.partners; EXCEPTION WHEN duplicate_object THEN NULL; END;
END $$;