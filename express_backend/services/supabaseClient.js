// Import stuff to set up Supabase client
const { createClient } = require('@supabase/supabase-js');

// Our original idea, just require this and use it
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

module.exports = {
    supabase: supabase
};

