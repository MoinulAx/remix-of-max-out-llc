-- Enable trigram extension for fast case-insensitive ILIKE search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ============================================================
-- INQUIRIES
-- ============================================================
CREATE INDEX IF NOT EXISTS inquiries_created_at_desc_idx
  ON public.inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_status_created_at_idx
  ON public.inquiries (status, created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_type_created_at_idx
  ON public.inquiries (type, created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_name_trgm_idx
  ON public.inquiries USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS inquiries_email_trgm_idx
  ON public.inquiries USING gin (email gin_trgm_ops);
CREATE INDEX IF NOT EXISTS inquiries_message_trgm_idx
  ON public.inquiries USING gin (message gin_trgm_ops);

-- ============================================================
-- APPLICATIONS  (legacy generic application form)
-- ============================================================
CREATE INDEX IF NOT EXISTS applications_created_at_desc_idx
  ON public.applications (created_at DESC);
CREATE INDEX IF NOT EXISTS applications_status_created_at_idx
  ON public.applications (status, created_at DESC);
CREATE INDEX IF NOT EXISTS applications_name_trgm_idx
  ON public.applications USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS applications_email_trgm_idx
  ON public.applications USING gin (email gin_trgm_ops);
CREATE INDEX IF NOT EXISTS applications_why_trgm_idx
  ON public.applications USING gin (why_interested gin_trgm_ops);

-- ============================================================
-- JOB APPLICATIONS
-- ============================================================
CREATE INDEX IF NOT EXISTS job_applications_created_at_desc_idx
  ON public.job_applications (created_at DESC);
CREATE INDEX IF NOT EXISTS job_applications_status_created_at_idx
  ON public.job_applications (status, created_at DESC);
CREATE INDEX IF NOT EXISTS job_applications_name_trgm_idx
  ON public.job_applications USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS job_applications_email_trgm_idx
  ON public.job_applications USING gin (email gin_trgm_ops);
CREATE INDEX IF NOT EXISTS job_applications_cover_trgm_idx
  ON public.job_applications USING gin (cover_letter gin_trgm_ops);

-- ============================================================
-- QUOTE REQUESTS
-- ============================================================
CREATE INDEX IF NOT EXISTS quote_requests_created_at_desc_idx
  ON public.quote_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS quote_requests_status_created_at_idx
  ON public.quote_requests (status, created_at DESC);
CREATE INDEX IF NOT EXISTS quote_requests_name_trgm_idx
  ON public.quote_requests USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS quote_requests_email_trgm_idx
  ON public.quote_requests USING gin (email gin_trgm_ops);
CREATE INDEX IF NOT EXISTS quote_requests_message_trgm_idx
  ON public.quote_requests USING gin (message gin_trgm_ops);