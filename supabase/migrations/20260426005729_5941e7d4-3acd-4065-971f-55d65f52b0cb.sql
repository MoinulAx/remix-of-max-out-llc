-- Careers: add fields the public Careers page already renders
ALTER TABLE public.careers
  ADD COLUMN IF NOT EXISTS department text,
  ADD COLUMN IF NOT EXISTS salary_range text,
  ADD COLUMN IF NOT EXISTS display_order integer NOT NULL DEFAULT 0;

-- Convert requirements from text to text[] (split existing newline-delimited content)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='careers'
      AND column_name='requirements' AND data_type='text'
  ) THEN
    ALTER TABLE public.careers
      ALTER COLUMN requirements TYPE text[]
      USING CASE
        WHEN requirements IS NULL OR requirements = '' THEN ARRAY[]::text[]
        ELSE string_to_array(requirements, E'\n')
      END;
    ALTER TABLE public.careers
      ALTER COLUMN requirements SET DEFAULT ARRAY[]::text[];
    UPDATE public.careers SET requirements = ARRAY[]::text[] WHERE requirements IS NULL;
    ALTER TABLE public.careers ALTER COLUMN requirements SET NOT NULL;
  END IF;
END $$;

-- Partners: add website field
ALTER TABLE public.partners
  ADD COLUMN IF NOT EXISTS website text;

-- Ensure updated_at triggers exist on the four tables admin manages
DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['careers','partners','roster','content_hub_posts'] LOOP
    IF NOT EXISTS (
      SELECT 1 FROM pg_trigger
      WHERE tgname = 'set_' || t || '_updated_at'
    ) THEN
      EXECUTE format(
        'CREATE TRIGGER set_%I_updated_at BEFORE UPDATE ON public.%I
         FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();',
        t, t
      );
    END IF;
  END LOOP;
END $$;