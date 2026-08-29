import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { UserProfile, SignUpPayload, SignInPayload } from '../types/auth';

interface AuthContextType {
  user: UserProfile | null;
  session: any | null;
  isLoading: boolean;
  signUp: (payload: SignUpPayload) => Promise<{ error: Error | null }>;
  signIn: (payload: SignInPayload) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPasswordForEmail: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: Error | null }>;
  updateProfileName: (fullName: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchProfile = async (userId: string, userEmail: string): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.warn('Could not fetch user profile from DB:', error.message);
      }

      if (data) {
        return {
          id: data.id,
          email: data.email || userEmail,
          fullName: data.full_name || userEmail.split('@')[0],
          avatarUrl: data.avatar_url || undefined,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };
      }

      // Fallback profile from auth session
      return {
        id: userId,
        email: userEmail,
        fullName: userEmail.split('@')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    } catch (err) {
      console.error('Error fetching profile:', err);
      return {
        id: userId,
        email: userEmail,
        fullName: userEmail.split('@')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
  };

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
      setSession(initialSession);
      if (initialSession?.user) {
        const prof = await fetchProfile(initialSession.user.id, initialSession.user.email || '');
        setUser(prof);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // 2. Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession);
        if (newSession?.user) {
          const prof = await fetchProfile(newSession.user.id, newSession.user.email || '');
          setUser(prof);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async ({ email, password, fullName }: SignUpPayload) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName.trim(),
        },
      },
    });

    if (error) {
      return { error: new Error(error.message) };
    }

    if (data.user) {
      // Upsert profile
      await supabase
        .from('profiles')
        .upsert({
          id: data.user.id,
          full_name: fullName.trim(),
          email: email.trim(),
          updated_at: new Date().toISOString(),
        })
        .select();
    }

    return { error: null };
  };

  const signIn = async ({ email, password }: SignInPayload) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: new Error(error.message) };
    }

    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const resetPasswordForEmail = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      return { error: new Error(error.message) };
    }

    return { error: null };
  };

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return { error: new Error(error.message) };
    }

    return { error: null };
  };

  const updateProfileName = async (fullName: string) => {
    if (!user) {
      return { error: new Error('Cannot update profile: not authenticated.') };
    }

    const trimmed = fullName.trim();
    if (!trimmed) {
      return { error: new Error('Name cannot be empty.') };
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: trimmed,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) {
      return { error: new Error(error.message) };
    }

    setUser((prev) => (prev ? { ...prev, fullName: trimmed } : null));
    return { error: null };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signUp,
        signIn,
        signOut,
        resetPasswordForEmail,
        updatePassword,
        updateProfileName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
