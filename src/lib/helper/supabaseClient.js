import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(import.meta.env.VITE_SUPABASEURL, import.meta.env.VITE_SUPABASE_ANNO_KEY)

