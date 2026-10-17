'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { UserProfile } from '@/types';
import {
  auth,
  isFirebaseConfigured,
  loginWithGoogle,
  logoutUser,
  checkRedirectResult,
  onAuthStateChanged,
} from '@/lib/firebase';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  isFirebaseConfigured: boolean;
  signInWithGoogle: () => Promise<void>;
  signInAsDemo: () => void;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const DEMO_STORAGE_KEY = 'awaaz_demo_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getInitialUser(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const storedDemo = sessionStorage.getItem(DEMO_STORAGE_KEY);
    if (storedDemo) {
      return JSON.parse(storedDemo);
    }
  } catch {
    sessionStorage.removeItem(DEMO_STORAGE_KEY);
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(getInitialUser);
  const [loading, setLoading] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    if (!isFirebaseConfigured) return false;
    return !getInitialUser();
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      return;
    }

    // Check redirect result first (for mobile redirect flow)
    checkRedirectResult().then((redirectUser) => {
      if (redirectUser) {
        setUser({
          uid: redirectUser.uid,
          displayName: redirectUser.displayName,
          email: redirectUser.email,
          photoURL: redirectUser.photoURL,
        });
      }
    });

    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setUser({
          uid: fbUser.uid,
          displayName: fbUser.displayName,
          email: fbUser.email,
          photoURL: fbUser.photoURL,
        });
      } else {
        const currentDemo = typeof window !== 'undefined' ? sessionStorage.getItem(DEMO_STORAGE_KEY) : null;
        if (!currentDemo) {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignInWithGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      if (!isFirebaseConfigured) {
        throw new Error('Firebase credentials are not configured yet in .env.local. You can use "Explore Demo Mode" below to test immediately.');
      }
      const fbUser = await loginWithGoogle();
      if (fbUser) {
        setUser({
          uid: fbUser.uid,
          displayName: fbUser.displayName,
          email: fbUser.email,
          photoURL: fbUser.photoURL,
        });
      }
    } catch (err: unknown) {
      console.error('Sign in error:', err);
      const fbErr = err as { code?: string; message?: string };
      let message = 'Unable to sign in with Google. Please try again.';
      if (fbErr.code === 'auth/unauthorized-domain') {
        message = 'This domain is not authorized in Firebase Console > Authentication > Settings > Authorized domains.';
      } else if (fbErr.code === 'auth/popup-closed-by-user') {
        message = 'Sign in was cancelled by closing the popup window.';
      } else if (fbErr.message) {
        message = fbErr.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInAsDemo = () => {
    setError(null);
    const demoProfile: UserProfile = {
      uid: 'demo_worker_ramesh_kumar',
      displayName: 'Ramesh Kumar (Gig Partner)',
      email: 'ramesh.partner@awaaz.demo',
      photoURL: null,
      isDemoUser: true,
    };
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(demoProfile));
    }
    setUser(demoProfile);
    setLoading(false);
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(DEMO_STORAGE_KEY);
      }
      await logoutUser();
      setUser(null);
    } catch (err: unknown) {
      console.error('Sign out error:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isFirebaseConfigured,
        signInWithGoogle: handleSignInWithGoogle,
        signInAsDemo: handleSignInAsDemo,
        signOut: handleSignOut,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
