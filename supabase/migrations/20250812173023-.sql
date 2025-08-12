-- Fix security linter: set immutable search_path for functions

-- 1) Ensure has_role uses a fixed search_path
ALTER FUNCTION public.has_role(uuid, public.app_role)
  SET search_path = public;

-- 2) Ensure update_updated_at_column uses a fixed search_path
ALTER FUNCTION public.update_updated_at_column()
  SET search_path = public;