import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables
const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Local storage fallback for quick configuration/testing in development
const getStoredUrl = (): string => {
  try {
    return localStorage.getItem('AURA_SUPABASE_URL') || '';
  } catch {
    return '';
  }
};

const getStoredKey = (): string => {
  try {
    return localStorage.getItem('AURA_SUPABASE_ANON_KEY') || '';
  } catch {
    return '';
  }
};

export const getSupabaseConfig = () => {
  const url = (envUrl || getStoredUrl()).trim();
  const anonKey = (envKey || getStoredKey()).trim();
  const isConfigured = Boolean(
    url &&
    anonKey &&
    url.startsWith('https://') &&
    !url.includes('placeholder') &&
    !url.includes('your-project-id')
  );

  return {
    url,
    anonKey,
    isConfigured,
    source: envUrl ? 'env' : getStoredUrl() ? 'localStorage' : 'none'
  };
};

export const saveSupabaseCredentials = (url: string, anonKey: string) => {
  localStorage.setItem('AURA_SUPABASE_URL', url.trim());
  localStorage.setItem('AURA_SUPABASE_ANON_KEY', anonKey.trim());
  // Reinitialize client
  initSupabaseClient();
};

export const clearStoredCredentials = () => {
  localStorage.removeItem('AURA_SUPABASE_URL');
  localStorage.removeItem('AURA_SUPABASE_ANON_KEY');
  initSupabaseClient();
};

let clientInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient => {
  if (!clientInstance) {
    initSupabaseClient();
  }
  return clientInstance!;
};

export const initSupabaseClient = (): SupabaseClient => {
  const { url, anonKey, isConfigured } = getSupabaseConfig();

  if (isConfigured) {
    clientInstance = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  } else {
    // Fallback unconfigured client instance
    clientInstance = createClient('https://placeholder.supabase.co', 'placeholder-key', {
      auth: {
        persistSession: false,
      },
    });
  }

  return clientInstance;
};

// Default export
export const supabase = getSupabaseClient();
export default supabase;
