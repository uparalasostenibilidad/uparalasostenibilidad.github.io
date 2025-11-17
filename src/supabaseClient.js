import { createClient } from '@supabase/supabase-js'

// Vite reemplaza import.meta.env.VITE_* en build. Si faltan, usamos fallback.
const ENV_URL = import.meta.env?.VITE_SUPABASE_URL || ''
const ENV_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || ''

// Fallbacks (los usados previamente en login.js). Reemplaza por tus propios valores seguros si procede.
const FALLBACK_URL = 'https://hkxugotjfkyalmlkojhq.supabase.co'
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreHVnb3RqZmt5YWxtbGtvamhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxODk3MTAsImV4cCI6MjA3Nzc2NTcxMH0.mV21rbO4K5gfmYWF_ZB5mcjPG2TLu80w0SOMBCoDkaE'

const SUPABASE_URL = ENV_URL || FALLBACK_URL
const SUPABASE_ANON_KEY = ENV_KEY || FALLBACK_KEY

if (!ENV_URL || !ENV_KEY) {
  console.warn('[supabaseClient] Usando valores de fallback porque no se definieron VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY.')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
