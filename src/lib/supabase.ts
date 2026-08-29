import { createClient, SupabaseClient } from '@supabase/supabase-js';

declare const __SUPABASE_URL__: string | undefined;
declare const __SUPABASE_KEY__: string | undefined;

export const getSupabaseUrl = (): string => {
  let url = '';
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_URL) {
    url = import.meta.env.VITE_SUPABASE_URL;
  } else if (typeof __SUPABASE_URL__ !== 'undefined' && __SUPABASE_URL__) {
    url = __SUPABASE_URL__;
  }
  return (url || '').trim().replace(/^["']|["']$/g, '');
};

export const getSupabaseKey = (): string => {
  let key = '';
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    key =
      import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
      import.meta.env.VITE_SUPABASE_ANON_KEY ||
      '';
  }
  if (!key && typeof __SUPABASE_KEY__ !== 'undefined' && __SUPABASE_KEY__) {
    key = __SUPABASE_KEY__;
  }
  return (key || '').trim().replace(/^["']|["']$/g, '');
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
