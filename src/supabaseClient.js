import { createClient } from '@supabase/supabase-js'

// Vite replaces import.meta.env.VITE_* at build time. Create a client using env vars.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not set. Supabase client will likely fail until you set them.')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
