// Healthcheck for email edge functions.
// - Confirms the Resend npm import resolves at module load
// - Reports which email-related secrets are present vs missing
// Public endpoint (verify_jwt = false) — does NOT leak secret values.

import { Resend } from 'npm:resend@4.0.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

const REQUIRED_SECRETS = ['RESEND_API_KEY'] as const;
const OPTIONAL_SECRETS = [
  'EMAIL_FROM',
  'EMAIL_TO',
  'CONTACT_EMAIL_TO',
  'APPLICATIONS_EMAIL_TO',
  'QUOTES_EMAIL_TO',
] as const;

type SecretStatus = { name: string; present: boolean };

function checkSecrets(names: readonly string[]): SecretStatus[] {
  return names.map((name) => ({
    name,
    present: Boolean(Deno.env.get(name)),
  }));
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // 1. Resend import resolution (top-level import succeeded if we got here)
  const resendImport = {
    ok: typeof Resend === 'function',
    version: '4.0.1',
  };

  // 2. Secret presence (names only, never values)
  const required = checkSecrets(REQUIRED_SECRETS);
  const optional = checkSecrets(OPTIONAL_SECRETS);
  const missingRequired = required.filter((s) => !s.present).map((s) => s.name);
  const missingOptional = optional.filter((s) => !s.present).map((s) => s.name);

  // 3. Sibling email functions on disk (best-effort, non-fatal)
  let siblingFunctions: string[] = [];
  try {
    const here = new URL('.', import.meta.url).pathname;
    const functionsDir = here.replace(/email-healthcheck\/?$/, '');
    for await (const entry of Deno.readDir(functionsDir)) {
      if (entry.isDirectory && entry.name.startsWith('send-')) {
        siblingFunctions.push(entry.name);
      }
    }
    siblingFunctions.sort();
  } catch {
    // ignore — filesystem inspection isn't critical
  }

  const healthy = resendImport.ok && missingRequired.length === 0;

  const body = {
    status: healthy ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    resend: resendImport,
    secrets: {
      required,
      optional,
      missing_required: missingRequired,
      missing_optional: missingOptional,
    },
    email_functions: siblingFunctions,
  };

  return new Response(JSON.stringify(body, null, 2), {
    status: healthy ? 200 : 503,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});