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

    const verify = async () => {
      // getUser() validates the JWT with the Supabase Auth server —
      // unlike getSession() it does not trust localStorage alone.
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (!active) return;

      if (userError || !user) {
        setState({ status: 'unauthenticated' });
        return;
      }

      const { data, error } = await supabase.rpc('has_role', {
        _user_id: user.id,
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

    // Re-verify on every auth state change (token refresh, sign-out, etc.)
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        if (active) setState({ status: 'unauthenticated' });
        return;
      }
      // Defer to avoid Supabase client deadlock inside the listener
      setTimeout(() => verify(), 0);
    });

    verify();

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
