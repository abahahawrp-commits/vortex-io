import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ContactMessage, SupabaseConfig } from '../types';

const STORAGE_KEY_CONFIG = 'portfolio_supabase_config';
const STORAGE_KEY_MESSAGES = 'portfolio_local_messages';

// Default initial config checking Vite env or stored settings
export function getSavedSupabaseConfig(): SupabaseConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to parse stored supabase config:', e);
  }

  return {
    url: (import.meta as any).env?.VITE_SUPABASE_URL || '',
    anonKey: (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '',
    isConnected: Boolean((import.meta as any).env?.VITE_SUPABASE_URL && (import.meta as any).env?.VITE_SUPABASE_ANON_KEY),
    lastSyncedAt: undefined,
  };
}

export function saveSupabaseConfig(config: SupabaseConfig): void {
  localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
}

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const config = getSavedSupabaseConfig();
  if (!config.url || !config.anonKey) {
    return null;
  }

  if (!supabaseInstance || (supabaseInstance as any).supabaseUrl !== config.url) {
    try {
      supabaseInstance = createClient(config.url, config.anonKey);
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
      supabaseInstance = null;
    }
  }

  return supabaseInstance;
}

// Save message: writes to Supabase if configured, otherwise caches locally and dispatches event
export async function syncContactMessage(message: ContactMessage): Promise<{ syncedToSupabase: boolean }> {
  // Store locally in all cases for instant responsive UI
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_MESSAGES) || '[]');
    existing.unshift(message);
    localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(existing));
    window.dispatchEvent(new CustomEvent('portfolio:new_message', { detail: message }));
  } catch (e) {
    console.warn('Local storage write error:', e);
  }

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase.from('messages').insert([
        {
          id: message.id,
          sender_name: message.sender_name,
          sender_email: message.sender_email,
          project_category: message.project_category,
          message_body: message.message_body,
          status: message.status,
          created_at: message.created_at,
        },
      ]);
      if (!error) {
        return { syncedToSupabase: true };
      }
      console.warn('Supabase insert warning:', error.message);
    } catch (err) {
      console.warn('Supabase sync skipped:', err);
    }
  }

  return { syncedToSupabase: false };
}

// Fetch all messages (hybrid merge between remote and local)
export async function fetchAllMessages(): Promise<ContactMessage[]> {
  const localMessages: ContactMessage[] = (() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_MESSAGES) || '[]');
    } catch {
      return [];
    }
  })();

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && Array.isArray(data)) {
        // Merge without duplicates
        const map = new Map<string, ContactMessage>();
        localMessages.forEach(m => map.set(m.id, m));
        data.forEach((m: any) => map.set(m.id, m as ContactMessage));
        return Array.from(map.values()).sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }
    } catch (err) {
      console.warn('Supabase remote fetch skipped:', err);
    }
  }

  return localMessages;
}

// SQL Script generator for the user's Supabase SQL Editor
export const SUPABASE_SQL_SCHEMA = `-- Skrip Pembuatan Tabel Supabase untuk Personal Portfolio
-- Silakan salin & jalankan di menu "SQL Editor" pada Dashboard Supabase Anda:

-- 1. Buat Tabel Messages (Pesan Masuk Kontak)
CREATE TABLE IF NOT EXISTS public.messages (
    id TEXT PRIMARY KEY,
    sender_name TEXT NOT NULL,
    sender_email TEXT NOT NULL,
    project_category TEXT NOT NULL,
    message_body TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Buat Tabel Analytics Events (Pelacakan Kunjungan)
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id TEXT PRIMARY KEY,
    event_type TEXT NOT NULL,
    path TEXT NOT NULL DEFAULT '/',
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Aktifkan Row Level Security (RLS)
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- 4. Kebijakan Akses: Izinkan Publik Menulis Pesan & Log
CREATE POLICY "Allow public insert messages" ON public.messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert analytics" ON public.analytics_events
    FOR INSERT WITH CHECK (true);

-- 5. Kebijakan Akses: Izinkan Baca Semua (atau untuk role terotentikasi)
CREATE POLICY "Allow read messages" ON public.messages
    FOR SELECT USING (true);

CREATE POLICY "Allow read analytics" ON public.analytics_events
    FOR SELECT USING (true);
`;
