import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  if (req.method !== 'GET') {
    return json({ error: 'Method not allowed' }, 405);
  }

  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return json({ error: 'Unauthorized', reason: 'missing_token' }, 401);
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } },
  );

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    return json({ error: 'Unauthorized', reason: 'invalid_token' }, 401);
  }

  const { data: isAdmin, error: roleError } = await supabase.rpc('has_role', {
    _user_id: user.id,
    _role: 'admin',
  });
  if (roleError) {
    return json({ error: 'Role check failed', detail: roleError.message }, 500);
  }
  if (isAdmin !== true) {
    return json({ error: 'Forbidden', reason: 'not_admin' }, 403);
  }

  const [inquiries, applications, jobApplications, quotes] = await Promise.all([
    supabase.from('inquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('applications').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('job_applications').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('quote_requests').select('id', { count: 'exact', head: true }).eq('status', 'new'),
  ]);

  return json({
    ok: true,
    user: { id: user.id, email: user.email },
    role: 'admin',
    timestamp: new Date().toISOString(),
    pending: {
      inquiries: inquiries.count ?? 0,
      applications: applications.count ?? 0,
      job_applications: jobApplications.count ?? 0,
      quote_requests: quotes.count ?? 0,
    },
  });
});
