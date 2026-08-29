import { createClient, SupabaseClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawPublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';
const rawAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const supabaseUrl = (rawUrl || '').trim();
const supabaseKey = (rawPublishableKey || rawAnonKey || '').trim();

export const getSupabaseUrl = (): string => supabaseUrl;
export const getSupabaseKey = (): string => supabaseKey;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseKey &&
    !supabaseUrl.includes('your-project-id') &&
    supabaseUrl.startsWith('http') &&
    !supabaseKey.includes('placeholder')
  );
};

export const supabase: SupabaseClient = createClient(
  isSupabaseConfigured() ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured() ? supabaseKey : 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: window.localStorage,
    },
  }
);
