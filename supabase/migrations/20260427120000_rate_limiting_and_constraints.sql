-- =========================================================
-- Rate limiting + DB-level constraints on public submission tables
-- =========================================================

-- =========================================================
-- 1. CHECK CONSTRAINTS — email format, field lengths
-- =========================================================

ALTER TABLE public.inquiries
  ADD CONSTRAINT inquiries_email_format
    CHECK (email ~* '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$'),
  ADD CONSTRAINT inquiries_name_length
    CHECK (char_length(name) BETWEEN 2 AND 200),
  ADD CONSTRAINT inquiries_message_length
    CHECK (message IS NULL OR char_length(message) <= 10000);

ALTER TABLE public.quote_requests
  ADD CONSTRAINT quote_requests_email_format
    CHECK (email ~* '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$'),
  ADD CONSTRAINT quote_requests_name_length
    CHECK (char_length(name) BETWEEN 2 AND 200),
  ADD CONSTRAINT quote_requests_message_length
    CHECK (message IS NULL OR char_length(message) <= 10000);

ALTER TABLE public.applications
  ADD CONSTRAINT applications_email_format
    CHECK (email ~* '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$'),
  ADD CONSTRAINT applications_name_length
    CHECK (char_length(name) BETWEEN 2 AND 200);

ALTER TABLE public.job_applications
  ADD CONSTRAINT job_applications_email_format
    CHECK (email ~* '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$'),
  ADD CONSTRAINT job_applications_name_length
    CHECK (char_length(name) BETWEEN 2 AND 200),
  ADD CONSTRAINT job_applications_cover_letter_length
    CHECK (cover_letter IS NULL OR char_length(cover_letter) <= 10000);

-- =========================================================
-- 2. RATE LIMITING TRIGGER FUNCTION
-- Max 5 submissions per email per hour per table.
-- Raises a user-visible error so the frontend can show it.
-- =========================================================

CREATE OR REPLACE FUNCTION public.check_submission_rate_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  recent_count INTEGER;
  table_name   TEXT := TG_TABLE_NAME;
BEGIN
  EXECUTE format(
    'SELECT COUNT(*) FROM public.%I WHERE email = $1 AND created_at > NOW() - INTERVAL ''1 hour''',
    table_name
  )
  INTO recent_count
  USING NEW.email;

  IF recent_count >= 5 THEN
    RAISE EXCEPTION 'rate_limit_exceeded'
      USING HINT = 'Too many submissions. Please wait before trying again.',
            ERRCODE = 'P0001';
  END IF;

  RETURN NEW;
END;
$$;

-- =========================================================
-- 3. ATTACH RATE LIMIT TRIGGER TO EACH SUBMISSION TABLE
-- =========================================================

CREATE TRIGGER rate_limit_inquiries
  BEFORE INSERT ON public.inquiries
  FOR EACH ROW EXECUTE FUNCTION public.check_submission_rate_limit();

CREATE TRIGGER rate_limit_quote_requests
  BEFORE INSERT ON public.quote_requests
  FOR EACH ROW EXECUTE FUNCTION public.check_submission_rate_limit();

CREATE TRIGGER rate_limit_applications
  BEFORE INSERT ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.check_submission_rate_limit();

CREATE TRIGGER rate_limit_job_applications
  BEFORE INSERT ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.check_submission_rate_limit();
