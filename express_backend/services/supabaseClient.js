// Import stuff to set up Supabase client
import { createClient } from '@supabase/supabase-js';

function createSupabaseClient(url, key) {
    const supabase = createClient(url, key);
    return supbase;
}

