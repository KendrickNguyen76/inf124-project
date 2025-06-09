// profileController.js

// Imports
const { supabase } = require("../services/supabaseClient");

// getUserProfile()
// Pulls all of the details about the current user from the profile table
async function getEntireUserProfile(req, res){
    const { token } = req.body;
    const { data: { user } } = await supabase.auth.getUser(token);
    
    const { data:user_profile, error } = await supabase
        .from('profile')
        .select()
        .eq('id', user.id);

    // Come back to error handling later
    if (error) {
        return res.status(401).json({ error: error.message });
    }

    res.json(user_profile);
}

module.exports= { getEntireUserProfile };
