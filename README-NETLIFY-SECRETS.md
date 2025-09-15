# Netlify secrets scan + EmailJS setup

This short guide explains the changes made to fix your Netlify build and keep EmailJS as primary with Supabase fallback.

## What changed
- Removed committed .env from the repo (Netlify flagged it as a secret).
- Updated netlify.toml to ignore public Supabase keys during secrets scanning:
  - `SECRETS_SCAN_OMIT_KEYS = "VITE_SUPABASE_URL,VITE_SUPABASE_ANON_KEY"`
- Redacted raw Supabase URL/ANON key values from docs to avoid future scan failures.
- Kept EmailJS as primary sender with Supabase Edge Functions fallback in `src/lib/emailjs.ts`.

## Netlify setup (do this in Site settings → Environment variables)
1. Add EmailJS env vars:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_CONTACT_TEMPLATE`
   - `VITE_EMAILJS_QUOTE_TEMPLATE`
   - `VITE_EMAILJS_APPLICATION_TEMPLATE`
   - `VITE_EMAILJS_PUBLIC_KEY`
2. Add Supabase env vars:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Add this to avoid scan failures with public Supabase values:
   - `SECRETS_SCAN_OMIT_KEYS = VITE_SUPABASE_URL,VITE_SUPABASE_ANON_KEY`
4. Re-deploy your site.

## EmailJS dashboard checklist
- Account → Domains: add your Netlify and custom domain(s)
- Templates: ensure variables exist and match what we send
  - Contact/Quote: `from_name, from_email, phone, service, budget_range, project_timeline, message`
  - Application: `from_name, from_email, service_type`
- Templates → Settings: make sure a default “TO” email is set

## How it works now
- Frontend tries EmailJS first.
- If EmailJS throws, we auto-call Supabase Edge Function (`send-*-email`) as fallback.

## Troubleshooting
- If build fails due to secrets scan, confirm step 3 above is set in Netlify.
- If EmailJS errors, check the browser console and verify template IDs and allowed domains.
- Check Supabase Edge Functions logs if the fallback triggers.
