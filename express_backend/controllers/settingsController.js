// settingsController.js

// Imports
const { supabase } = require("../services/supabaseClient");

// editProfile()
// handles requests/responses to update the "Edit Profile" part 
// of the user settings page
async function editProfile(req, res) {
    // Written, but has not been tested yet
    const {token, newPfp, newBio} = req.body;
    const { data: { user } } = await supabase.auth.getUser(token);
    
    console.log(user.id);
    console.log(`Changing Profile Pic and Bio to ${newPfp} and ${newBio}`);

    const { error } = await supabase
        .from('profile') 
        .update({ bio: newBio, profile_pic: newPfp })
        .eq('id', user.id)
    
    if (error) {
        return res.status(401).json({ error: error.message });
    }

    res.status(200).send('Successly Updated Profile!');
}

// getProfileDetails()
// Pulls all of the details about the current user from the profile table
async function getProfileDetails(req, res){
    const { token } = req.body;
    // Get the user from the auth table, and store its id
    const { data: { user } } = await supabase.auth.getUser(token);
    
    const { data:user_profile, error } = await supabase
        .from('profile')
        .select('bio, is_light, profile_pic')
        .eq('id', user.id);

    // Come back to error handling later
    if (error) {
        return res.status(401).json({ error: error.message });
    }

    res.json(user_profile);
}

module.exports = {
    getProfileDetails: getProfileDetails,
    editProfile: editProfile,
};
