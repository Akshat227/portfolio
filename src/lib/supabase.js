/**
 * Browser Supabase client.
 *
 * Credentials MUST be Vite public env vars (VITE_*), because this file
 * runs in the visitor's browser. The anon key is safe to expose only if
 * Row Level Security on the project allows SELECT to the public and
 * denies INSERT/UPDATE/DELETE to anonymous users.
 *
 * If either env var is missing, getSupabase() returns null and the site
 * keeps using the local fallback files in src/data/.
 */
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let client = null

export function getSupabase() {
  if (!url || !anonKey) return null
  if (!client) {
    client = createClient(url, anonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      realtime: {
        params: { eventsPerSecond: 5 },
      },
    })
  }
  return client
}

export function isSupabaseConfigured() {
  return Boolean(url && anonKey)
}
