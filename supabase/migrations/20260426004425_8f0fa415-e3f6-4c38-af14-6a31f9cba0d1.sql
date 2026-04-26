-- Grant admin role to the two confirmed accounts.
-- Idempotent thanks to the (user_id, role) unique constraint on user_roles.
INSERT INTO public.user_roles (user_id, role)
VALUES
  ('931ae253-7f37-44c9-9e31-bfe316bd7d58', 'admin'),
  ('0284aed6-c2a4-4991-ab6e-f90b6ed72ad9', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;