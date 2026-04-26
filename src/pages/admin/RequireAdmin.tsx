import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type AuthState =
  | { status: 'checking' }
  | { status: 'unauthenticated' }
  | { status: 'authorized' }
  | { status: 'forbidden' };

const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [state, setState] = useState<AuthState>({ status: 'checking' });
  const { toast } = useToast();

  useEffect(() => {
    let active = true;

    const verify = async (userId: string | undefined) => {
      if (!userId) {
        if (active) setState({ status: 'unauthenticated' });
        return;
      }
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: userId,
        _role: 'admin',
      });
      if (!active) return;
      if (error) {
        setState({ status: 'forbidden' });
        return;
      }
      if (data === true) {
        setState({ status: 'authorized' });
      } else {
        // Authenticated but not an admin — sign them out so they don't
        // get bounced back here from /admin (which auto-forwards signed-in
        // admins to the dashboard).
        await supabase.auth.signOut();
        if (!active) return;
        toast({
          title: 'Access denied',
          description: 'This account does not have admin permissions.',
          variant: 'destructive',
        });
        setState({ status: 'forbidden' });
      }
    };

    // Set up listener BEFORE getSession (Supabase best practice)
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      // Defer Supabase calls out of the listener to avoid deadlocks
      setTimeout(() => verify(session?.user?.id), 0);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      verify(session?.user?.id);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [toast]);

  if (state.status === 'checking') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 text-sm">
        Verifying access…
      </div>
    );
  }

  if (state.status !== 'authorized') {
    return <Navigate to="/admin" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default RequireAdmin;
