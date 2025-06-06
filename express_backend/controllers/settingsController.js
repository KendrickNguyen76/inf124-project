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

    console.log(token);
}

module.exports = {
    getProfileDetails: getProfileDetails,
};
