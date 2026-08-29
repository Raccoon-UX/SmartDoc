import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const getSupabaseUrl = (): string => {
  const url = (import.meta.env.VITE_SUPABASE_URL || '').trim();
  return url.replace(/^["']|["']$/g, '');
};

export const getSupabaseKey = (): string => {
  const key = (
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    ''
  ).trim();
  return key.replace(/^["']|["']$/g, '');
};

export const isSupabaseConfigured = (): boolean => {
  const url = getSupabaseUrl();
  const key = getSupabaseKey();
  return Boolean(
    url &&
    key &&
    !url.includes('your-project-id') &&
    url.startsWith('http') &&
    !key.includes('placeholder')
  );
};

const configured = isSupabaseConfigured();
const supabaseUrl = configured ? getSupabaseUrl() : 'https://placeholder.supabase.co';
const supabaseKey = configured ? getSupabaseKey() : 'placeholder-anon-key';

// Create a singleton instance of the Supabase client
export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: window.localStorage,
    },
  }
);
