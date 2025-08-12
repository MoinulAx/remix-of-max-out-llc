-- Secure job_applications: allow SELECT only to admins or the applicant (owner)

-- 1) Add user_id to link applications to authenticated users (optional/nullable)
ALTER TABLE public.job_applications
  ADD COLUMN IF NOT EXISTS user_id uuid NULL REFERENCES auth.users(id) ON DELETE SET NULL;

-- Helpful index
CREATE INDEX IF NOT EXISTS idx_job_applications_user_id ON public.job_applications(user_id);

-- 2) Ensure RLS is enabled
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- 3) Admin-or-owner SELECT policy (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'job_applications' AND policyname = 'Admins or owner can view job applications'
  ) THEN
    CREATE POLICY "Admins or owner can view job applications"
      ON public.job_applications
      FOR SELECT
      TO authenticated
      USING (
        public.has_role(auth.uid(), 'admin')
        OR user_id = auth.uid()
      );
  END IF;
END$$;

-- Note: existing INSERT policy allowing public submissions remains unchanged