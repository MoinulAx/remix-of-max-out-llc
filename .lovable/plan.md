# Wire the full admin panel to Supabase

## Current state

| Page | Status |
|---|---|
| `AdminLogin` / `RequireAdmin` / `AdminLayout` | Already on Supabase (auth + role check) |
| `AdminInquiries` | Already on Supabase (read + status update + delete) |
| `AdminDashboard` | Stats use hardcoded mock numbers; only the "Server-Verified" card is live |
| `AdminCareers` | Mock — uses `careersStore` (in-memory) |
| `AdminContentHub` | Mock — local `useState` only |
| `AdminPartners` | Mock — local `useState` only |
| `AdminRoster` | Mock — local `useState` only |

All target tables already exist in Supabase with admin-only RLS.

## What we'll build

### 1. AdminPartners → `partners` table
- Read all partners ordered by `sort_order`
- Add/edit/delete rows (name, logo_url, description, sort_order)
- Logo upload to existing `partner-logos` storage bucket
- Optimistic updates with rollback on error
- Drop `defaultPartners` mock and the `careersStore` for partners

### 2. AdminRoster → `roster` table
- Two tabs: Leadership (category = 'leadership') and Talent (category = others)
- CRUD on name, bio, image_url, category, social_links (JSON), sort_order
- Image upload to existing `roster-images` bucket
- Replace `defaultLeadership` / `defaultRoster` / `defaultCategories` mocks

### 3. AdminCareers → `careers` table
- Read/create/update/delete jobs (title, type, location, description, requirements, is_active)
- Toggle `is_active` switch with immediate DB write
- Delete `src/lib/careersStore.ts` and remove all imports
- Update `AdminDashboard` to read job count from Supabase instead of the store

### 4. AdminContentHub → `content_hub_posts` table
- Single list (not 3 separate mock arrays), filtered by `media_type`
- CRUD on title, media_url, media_type ('youtube' | 'image' | 'video'), platform, sort_order, is_published
- Media upload to existing `content-hub-media` bucket for non-YouTube items
- Replace the three mock arrays

### 5. AdminDashboard real stats
- Replace the hardcoded `stats` array with live counts from Supabase:
  - Videos → `content_hub_posts` count
  - Roster Members → `roster` count
  - Open Positions → `careers` where `is_active = true`
  - Inquiries → `inquiries` where `status = 'new'`
  - Partners → `partners` count
- Remove the amber "Mock Data Mode" banner since the panel is no longer mock

### 6. Shared utilities
- New `src/hooks/useSupabaseTable.ts` — small hook that handles fetch/loading/error so the four list pages don't repeat the same boilerplate
- New `src/lib/uploadImage.ts` helper — wraps `supabase.storage.upload` + `getPublicUrl`, returns the public URL

### 7. Seed data so the dashboard isn't empty
A migration that inserts realistic starter rows so the admin pages and the public site have something to display:
- 4 leadership members + ~6 talent roster entries (using existing brand info)
- 5 partners (CPK Shawn, Rummspace, EPC Studios, etc.)
- The 8 internships/commission roles already in your career memory
- A few sample content hub posts

## Out of scope
- Changing public-facing pages (`/roster`, `/careers`, etc.) — those already read from Supabase via existing hooks
- Job applications / quote requests admin UI — separate feature, ask if you want it next
- Real-time subscriptions — using normal fetches; refresh button on each page

## Technical notes (skip if non-technical)

- All writes are guarded by existing RLS policies (`Admins manage X`). The `RequireAdmin` route guard ensures the user has the role before pages mount, but every mutation will still fail safely server-side if anyone bypasses it.
- Storage uploads use `{bucket}/{timestamp}-{slug}.{ext}` naming to avoid collisions. Public URLs come from `getPublicUrl` since all four image buckets are public.
- Optimistic UI pattern: snapshot prev state → apply locally → call Supabase → rollback + toast on error. Same pattern already used in `AdminInquiries`.
- Storage uploads need bucket-level INSERT policies for authenticated users — will check and add if missing during implementation.
- Seed data uses an idempotent `INSERT ... WHERE NOT EXISTS` pattern keyed on `name`/`title` so it's safe to re-run.

## Build order
1. Shared `useSupabaseTable` hook + `uploadImage` helper
2. AdminPartners (smallest — proves the pattern)
3. AdminCareers (delete old store, update dashboard import)
4. AdminRoster
5. AdminContentHub
6. AdminDashboard live stats + remove mock banner
7. Seed migration so everything has content
