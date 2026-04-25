import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ADMIN_TOKEN_KEY = 'maxout-admin-token';
const ADMIN_TOKEN_VALUE = 'authenticated';

const readToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(ADMIN_TOKEN_KEY);
  } catch {
    return null;
  }
};

const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  // Compute synchronously on first render so protected UI never appears
  // even for one frame when the token is missing/invalid.
  const [token, setToken] = useState<string | null>(() => readToken());

  useEffect(() => {
    // Re-validate on tab focus and cross-tab logout so a stale session
    // can never keep showing admin UI after sign-out elsewhere.
    const sync = () => setToken(readToken());
    window.addEventListener('storage', sync);
    window.addEventListener('focus', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('focus', sync);
    };
  }, []);

  if (token !== ADMIN_TOKEN_VALUE) {
    return <Navigate to="/admin" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default RequireAdmin;
