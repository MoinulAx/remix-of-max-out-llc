-- Ensure RLS and admin-only SELECT for quote_requests without breaking public INSERTs

-- 1) Enable RLS explicitly (safe if already enabled)
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- 2) Add admin-only SELECT policy (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'quote_requests' AND policyname = 'Admins can view quote requests'
  ) THEN
    CREATE POLICY "Admins can view quote requests"
      ON public.quote_requests
      FOR SELECT
      TO authenticated
      USING (public.has_role(auth.uid(), 'admin'));
  END IF;
END$$;

-- Note: existing INSERT policy "Anyone can submit quote requests" remains unchanged