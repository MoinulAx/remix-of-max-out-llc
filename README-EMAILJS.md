# EmailJS + Supabase Fallback Setup

This project sends emails from the frontend with EmailJS and automatically falls back to Supabase Edge Functions if EmailJS fails.

## What I changed
- Replaced hardcoded EmailJS keys with Netlify env vars in `src/lib/emailjs.ts`:
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_CONTACT_TEMPLATE`
  - `VITE_EMAILJS_QUOTE_TEMPLATE`
  - `VITE_EMAILJS_APPLICATION_TEMPLATE`
  - `VITE_EMAILJS_PUBLIC_KEY`
- Re-enabled Supabase fallback calls in `src/lib/emailjs.ts` for:
  - `send-contact-email`
  - `send-quote-email`
  - `send-application-email`
- No UI or routing files were changed.

## Netlify setup (required)
1. In Netlify → Site settings → Build & deploy → Environment variables, add these variables with your EmailJS values:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_CONTACT_TEMPLATE`
   - `VITE_EMAILJS_QUOTE_TEMPLATE`
   - `VITE_EMAILJS_APPLICATION_TEMPLATE`
   - `VITE_EMAILJS_PUBLIC_KEY`
2. Keep your existing Supabase vars (already configured in code) for the fallback edge functions.
3. Click "Deploy site" (env changes require a rebuild).

## EmailJS dashboard settings
- Allowed domains: add your Netlify domain(s) and custom domain(s) in EmailJS → Account → Domains.
- Template variables must match what we send:
  - Contact/Quote: `from_name`, `from_email`, `phone`, `service`, `budget_range`, `project_timeline`, `message`
  - Application: `from_name`, `from_email`, `service_type`

## How it works (flow)
- Frontend calls EmailJS first.
- If EmailJS throws, we automatically call a Supabase Edge Function fallback (`send-*-email`).
- Fallback functions use Resend on the server side so no private keys are exposed in the frontend.

## Testing
1. Open the site Contact, Quote, or Careers form.
2. Submit a test entry.
3. Check your inbox and the browser console for success.
4. If EmailJS fails, fallback will attempt delivery; check Supabase → Edge Functions → Logs for `send-*-email`.

## Troubleshooting
- Rebuild after changing Netlify envs.
- Make sure your EmailJS domain allowlist includes your deployed URL.
- Confirm Template IDs and fields match exactly.
- Check Supabase Edge Function logs if fallback triggers.

If you want to disable the fallback entirely, remove the `catch` fallback blocks in `src/lib/emailjs.ts`.