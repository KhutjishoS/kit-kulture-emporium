import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

// Only create client if we have valid credentials
export const supabase = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://your-project.supabase.co' 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null 