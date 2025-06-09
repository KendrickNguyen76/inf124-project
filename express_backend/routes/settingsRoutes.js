const express = require('express');
const router = express.Router();
const { getProfileDetails, editProfile, editAppearance, editNameSocials} = require('../controllers/settingsController');

// Route that returns information about the specified user
// stored in the 'profile' database table.
router.post('/profiledetails', getProfileDetails);

// Route that updates the user's pfp and bio
router.post('/editprofile', editProfile);

// Route that updates the user's light or dark mode preference
router.post('/editappearance', editAppearance);

// Route that updates the user's username and social media links
router.post('/editnamesocials', editNameSocials);

module.exports = router;
