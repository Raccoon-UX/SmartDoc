import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gsieyovyxbsbxdolgmtj.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable__Ndpj1AYo8ctYT2Chy7UWA_RMKeb9po';

// Deterministic singleton Supabase client
export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: window.localStorage,
    },
  }
);
