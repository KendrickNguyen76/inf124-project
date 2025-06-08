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
    
    console.log(`Updating Bio and PFP: ${user.id}`);

    const { error } = await supabase
        .from('profile') 
        .update({ bio: newBio, profile_pic: newPfp })
        .eq('id', user.id)

    const { data:user_profile, error:profile_fetch_error } = await supabase
        .from('profile')
        .select('bio, profile_pic')
        .eq('id', user.id);

    updateSuccess = (user_profile[0].bio === newBio) && (user_profile[0].profile_pic === newPfp);

    if (error) {
        return res.status(401).json({ error: error.message });
    } else if (!updateSuccess) {
        res.status(406).send(`
            Attempted to change profile pic to ${newPfp} and ${newBio} 
            but values are ${user_profile[0].profile_pic} and ${user_profile[0].bio}
            `);
    } else {
        res.status(200).send('Successly Updated Profile!');
    }
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


// editIsLightSetting()
// Handles responses/requests from the "Edit Appearance" tab
// on the Edit Profile page. Specifically, change the is_light
// boolean in the profile table.
async function editAppearance(req, res) {
    const { token, newIsLight } = req.body;
    const { data: { user } } = await supabase.auth.getUser(token);

    console.log(`Updating Appearance: ${user.id}`);

    const { error } = await supabase
        .from('profile') 
        .update({ is_light: newIsLight })
        .eq('id', user.id)

    const { data:user_is_light, error:is_light_fetch_error } = await supabase
        .from('profile')
        .select('is_light')
        .eq('id', user.id);

    lightUpdateSuccess = user_is_light[0].is_light === newIsLight;

    if (error) {
        return res.status(401).json({ error: error.message });
    } else if (!lightUpdateSuccess) {
        res.status(406).send(`
            Attempted to set is_light to ${newIsLight}, but value is ${user_is_light[0].is_light}
            `);
    } else {
        res.status(200).send('Successly Updated Appearance!');
    }
}


module.exports = {
    getProfileDetails: getProfileDetails,
    editProfile: editProfile,
    editAppearance: editAppearance,
};



