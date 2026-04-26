
-- =========================================================
-- 1. ENUM
-- =========================================================
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- =========================================================
-- 2. updated_at helper
-- =========================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- =========================================================
-- 3. PROFILES
-- =========================================================
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- 4. USER_ROLES + has_role function
-- =========================================================
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- 5. Auto-create profile on signup
-- =========================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =========================================================
-- 6. ROSTER
-- =========================================================
CREATE TABLE public.roster (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text,
  image_url text,
  bio text,
  social_links jsonb DEFAULT '{}'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.roster ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Roster is publicly viewable"
  ON public.roster FOR SELECT USING (true);

CREATE POLICY "Admins manage roster"
  ON public.roster FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_roster_updated_at
  BEFORE UPDATE ON public.roster
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- 7. PARTNERS
-- =========================================================
CREATE TABLE public.partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  description text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Partners are publicly viewable"
  ON public.partners FOR SELECT USING (true);

CREATE POLICY "Admins manage partners"
  ON public.partners FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_partners_updated_at
  BEFORE UPDATE ON public.partners
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- 8. CAREERS
-- =========================================================
CREATE TABLE public.careers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text,
  location text,
  description text,
  requirements text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active careers are publicly viewable"
  ON public.careers FOR SELECT USING (is_active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage careers"
  ON public.careers FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_careers_updated_at
  BEFORE UPDATE ON public.careers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- 9. INQUIRIES (public can submit, only admins can read)
-- =========================================================
CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text,
  type text NOT NULL DEFAULT 'booking',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an inquiry"
  ON public.inquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all inquiries"
  ON public.inquiries FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update inquiries"
  ON public.inquiries FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete inquiries"
  ON public.inquiries FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_inquiries_updated_at
  BEFORE UPDATE ON public.inquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- 10. APPLICATIONS (public can submit, only admins can read)
-- =========================================================
CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  portfolio text,
  experience text,
  why_interested text,
  job_id uuid REFERENCES public.careers(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an application"
  ON public.applications FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all applications"
  ON public.applications FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update applications"
  ON public.applications FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete applications"
  ON public.applications FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- 11. CONTENT HUB POSTS
-- =========================================================
CREATE TABLE public.content_hub_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  media_url text,
  media_type text,
  platform text,
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.content_hub_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published content hub posts are publicly viewable"
  ON public.content_hub_posts FOR SELECT USING (is_published = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage content hub posts"
  ON public.content_hub_posts FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_content_hub_posts_updated_at
  BEFORE UPDATE ON public.content_hub_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- 12. STORAGE BUCKETS (public read, admin write)
-- =========================================================
INSERT INTO storage.buckets (id, name, public) VALUES
  ('roster-images', 'roster-images', true),
  ('partner-logos', 'partner-logos', true),
  ('content-hub-media', 'content-hub-media', true),
  ('portfolio-photography', 'portfolio-photography', true),
  ('portfolio-videography', 'portfolio-videography', true),
  ('portfolio-web', 'portfolio-web', true)
ON CONFLICT (id) DO NOTHING;

-- Public read for all six buckets
CREATE POLICY "Public can read roster-images"
  ON storage.objects FOR SELECT USING (bucket_id = 'roster-images');
CREATE POLICY "Public can read partner-logos"
  ON storage.objects FOR SELECT USING (bucket_id = 'partner-logos');
CREATE POLICY "Public can read content-hub-media"
  ON storage.objects FOR SELECT USING (bucket_id = 'content-hub-media');
CREATE POLICY "Public can read portfolio-photography"
  ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-photography');
CREATE POLICY "Public can read portfolio-videography"
  ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-videography');
CREATE POLICY "Public can read portfolio-web"
  ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-web');

-- Admin write/update/delete on the six buckets
CREATE POLICY "Admins upload to managed buckets"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id IN ('roster-images','partner-logos','content-hub-media','portfolio-photography','portfolio-videography','portfolio-web')
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins update managed buckets"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id IN ('roster-images','partner-logos','content-hub-media','portfolio-photography','portfolio-videography','portfolio-web')
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins delete from managed buckets"
  ON storage.objects FOR DELETE
  USING (
    bucket_id IN ('roster-images','partner-logos','content-hub-media','portfolio-photography','portfolio-videography','portfolio-web')
    AND public.has_role(auth.uid(), 'admin')
  );
