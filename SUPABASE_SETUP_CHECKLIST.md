# Supabase Backend Setup Checklist — Max Out Management

Run these steps **in order** after enabling Lovable Cloud (which provisions Supabase automatically).
Each SQL block can be executed as a Supabase migration. Lovable will create migrations for you when
you paste these into chat — just say "run this migration".

---

## ✅ Step 0 — Prerequisites

- [ ] Lovable Cloud is enabled (this auto-provisions Supabase + generates `src/integrations/supabase/client.ts`)
- [ ] `.env` contains `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`
- [ ] Confirmed Supabase client imports work: `import { supabase } from "@/integrations/supabase/client"`

---

## ✅ Step 1 — Enums

```sql
-- App role enum (used by user_roles + has_role function)
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Inquiry type
CREATE TYPE public.inquiry_type AS ENUM ('booking', 'management', 'general');

-- Inquiry status
CREATE TYPE public.inquiry_status AS ENUM ('new', 'read', 'archived');

-- Job employment type
CREATE TYPE public.job_type AS ENUM ('internship', 'commission', 'full_time', 'part_time', 'contract');

-- Content hub platform
CREATE TYPE public.content_platform AS ENUM ('instagram', 'youtube', 'tiktok', 'twitter', 'other');
```

---

## ✅ Step 2 — Core Tables

### 2.1 profiles (linked to auth.users)
```sql
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
```

### 2.2 user_roles (SEPARATE from profiles — security critical)
```sql
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
```

### 2.3 roster
```sql
CREATE TABLE public.roster (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  image_url text,
  bio text,
  social_links jsonb DEFAULT '{}'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.roster ENABLE ROW LEVEL SECURITY;
```

### 2.4 partners
```sql
CREATE TABLE public.partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  description text,
  website_url text,
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
```

### 2.5 careers
```sql
CREATE TABLE public.careers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type public.job_type NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  requirements text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
```

### 2.6 inquiries (form submissions — admin only)
```sql
CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  type public.inquiry_type NOT NULL DEFAULT 'general',
  subject text,
  message text NOT NULL,
  status public.inquiry_status NOT NULL DEFAULT 'new',
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
```

### 2.7 applications (career applications — admin only)
```sql
CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES public.careers(id) ON DELETE SET NULL,
  job_title text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  portfolio_url text,
  experience text,
  why_interested text,
  status public.inquiry_status NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
```

### 2.8 content_hub_posts
```sql
CREATE TABLE public.content_hub_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  caption text,
  media_url text NOT NULL,
  media_type text NOT NULL CHECK (media_type IN ('image', 'video')),
  platform public.content_platform NOT NULL DEFAULT 'instagram',
  external_url text,
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.content_hub_posts ENABLE ROW LEVEL SECURITY;
```

---

## ✅ Step 3 — Security Definer Functions

### 3.1 has_role (prevents RLS recursion — CRITICAL)
```sql
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;
```

### 3.2 handle_new_user (auto-create profile on signup)
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;
```

### 3.3 update_updated_at (timestamp trigger function)
```sql
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
```

---

## ✅ Step 4 — Triggers

### 4.1 Auto-create profile on user signup
```sql
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

### 4.2 updated_at on every mutable table
```sql
CREATE TRIGGER set_updated_at_profiles BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER set_updated_at_roster BEFORE UPDATE ON public.roster
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER set_updated_at_partners BEFORE UPDATE ON public.partners
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER set_updated_at_careers BEFORE UPDATE ON public.careers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER set_updated_at_content_hub BEFORE UPDATE ON public.content_hub_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
```

---

## ✅ Step 5 — RLS Policies

### 5.1 profiles
```sql
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));
```

### 5.2 user_roles (admin-only management)
```sql
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
```

### 5.3 Public-read tables (roster, partners, careers, content_hub_posts)
```sql
-- ROSTER
CREATE POLICY "Public can read published roster"
  ON public.roster FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can manage roster"
  ON public.roster FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- PARTNERS
CREATE POLICY "Public can read published partners"
  ON public.partners FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can manage partners"
  ON public.partners FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- CAREERS
CREATE POLICY "Public can read active careers"
  ON public.careers FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage careers"
  ON public.careers FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- CONTENT HUB
CREATE POLICY "Public can read published posts"
  ON public.content_hub_posts FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can manage posts"
  ON public.content_hub_posts FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
```

### 5.4 Form-submission tables (anyone can INSERT, only admins can SELECT)
```sql
-- INQUIRIES
CREATE POLICY "Anyone can submit inquiries"
  ON public.inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view inquiries"
  ON public.inquiries FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update inquiries"
  ON public.inquiries FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete inquiries"
  ON public.inquiries FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- APPLICATIONS
CREATE POLICY "Anyone can submit applications"
  ON public.applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view applications"
  ON public.applications FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update applications"
  ON public.applications FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete applications"
  ON public.applications FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));
```

---

## ✅ Step 6 — Storage Buckets

```sql
INSERT INTO storage.buckets (id, name, public) VALUES
  ('roster-images', 'roster-images', true),
  ('partner-logos', 'partner-logos', true),
  ('content-hub-media', 'content-hub-media', true),
  ('portfolio-photography', 'portfolio-photography', true),
  ('portfolio-videography', 'portfolio-videography', true),
  ('portfolio-web', 'portfolio-web', true);
```

### Storage policies (public read, admin write/delete)
```sql
-- Public read for all 6 buckets
CREATE POLICY "Public read access"
  ON storage.objects FOR SELECT
  USING (bucket_id IN (
    'roster-images','partner-logos','content-hub-media',
    'portfolio-photography','portfolio-videography','portfolio-web'
  ));

-- Admin upload
CREATE POLICY "Admins can upload"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id IN (
      'roster-images','partner-logos','content-hub-media',
      'portfolio-photography','portfolio-videography','portfolio-web'
    )
    AND public.has_role(auth.uid(), 'admin')
  );

-- Admin update
CREATE POLICY "Admins can update files"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id IN (
      'roster-images','partner-logos','content-hub-media',
      'portfolio-photography','portfolio-videography','portfolio-web'
    )
    AND public.has_role(auth.uid(), 'admin')
  );

-- Admin delete
CREATE POLICY "Admins can delete files"
  ON storage.objects FOR DELETE
  USING (
    bucket_id IN (
      'roster-images','partner-logos','content-hub-media',
      'portfolio-photography','portfolio-videography','portfolio-web'
    )
    AND public.has_role(auth.uid(), 'admin')
  );
```

---

## ✅ Step 7 — Seed your admin user

After signing up an admin via the app (or via Cloud → Users):

```sql
-- Replace with the actual user UUID from auth.users
INSERT INTO public.user_roles (user_id, role)
VALUES ('PASTE-ADMIN-UUID-HERE', 'admin');
```

To find the UUID:
```sql
SELECT id, email FROM auth.users WHERE email = 'you@example.com';
```

---

## ✅ Step 8 — Frontend wiring checklist

- [ ] Replace `AdminLogin.tsx` hardcoded check → `supabase.auth.signInWithPassword`
- [ ] Replace `RequireAdmin.tsx` localStorage token → `onAuthStateChange` + `has_role` check
- [ ] Add Sign Out button in `AdminLayout.tsx` → `supabase.auth.signOut()`
- [ ] Delete `src/lib/careersStore.ts` → query `careers` table
- [ ] All admin pages use Supabase queries with proper error handling
- [ ] All public pages use Supabase queries
- [ ] Form submissions: insert into `inquiries`/`applications` AND trigger edge function
- [ ] Generate types: Lovable auto-regenerates `src/integrations/supabase/types.ts` after migrations

---

## ✅ Step 9 — Verify

- [ ] Run security scan from Lovable Cloud → Security
- [ ] Confirm zero ERROR-level findings
- [ ] Test: log out → `/admin/dashboard` redirects to `/admin`
- [ ] Test: submit a contact form → row appears in `inquiries`
- [ ] Test: admin uploads a roster image → appears on public `Roster.tsx`

---

## 🛡️ Security rules to never violate

1. **Roles live in `user_roles` only** — never on `profiles`, never in localStorage.
2. **Always use `has_role()` in RLS** — never query the same table inside its own policy (causes infinite recursion).
3. **All policies use `SECURITY DEFINER` functions** for cross-table role checks.
4. **`SET search_path = public`** on every SECURITY DEFINER function.
5. **Form submissions are public INSERT, admin-only SELECT** — protects user data.
6. **Storage buckets: public read, admin write** — never allow anonymous uploads.
