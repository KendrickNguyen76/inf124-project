// Import stuff to set up Supabase client
const { createClient } = require('@supabase/supabase-js');

function createSupabaseClient(url, key) {
    const supabase = createClient(url, key);
    return supabase;
}

module.exports = {
    createSupabaseClient: createSupabaseClient
};

