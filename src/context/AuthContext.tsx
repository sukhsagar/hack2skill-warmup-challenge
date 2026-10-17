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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Check demo user first from sessionStorage
    try {
      const storedDemo = sessionStorage.getItem(DEMO_STORAGE_KEY);
      if (storedDemo) {
        const parsed = JSON.parse(storedDemo);
        setUser(parsed);
        setLoading(false);
        return;
      }
    } catch {
      sessionStorage.removeItem(DEMO_STORAGE_KEY);
    }

    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }

    // 2. Check redirect result for mobile OAuth
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
        try {
          const currentDemo = sessionStorage.getItem(DEMO_STORAGE_KEY);
          if (!currentDemo) {
            setUser(null);
          }
        } catch {
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
    try {
      sessionStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(demoProfile));
    } catch {
      // ignore
    }
    setUser(demoProfile);
    setLoading(false);
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      sessionStorage.removeItem(DEMO_STORAGE_KEY);
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
