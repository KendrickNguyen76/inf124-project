// settingsController.js

// Imports
const { supabase } = require("../services/supabaseClient");

// editProfile - handles requests/responses for the "Edit Profile"
// part of the user settings page
async function editProfile(req, res) {
}

// getProfileDetails - pulls all of the details
// about the current user from the profile table
async function getProfileDetails(req, res){
    const { token } = req.body;
    // Get the user from the auth table, and store its id
    const { data: { user } } = await supabase.auth.getUser(token);
    const user_id = user.id;
    
    const { data:user_profile, error } = await supabase
        .from('profile')
        .select('bio, is_light, profile_pic')
        .eq('id', user_id);

    // Come back to error handling later
    if (error) {
        return res.status(401).json({ error: error.message });
    }

    res.json(user_profile);
}

module.exports = {
    getProfileDetails: getProfileDetails,
};
