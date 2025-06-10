const express = require('express');
const router = express.Router();
const { validateNameSocials, validatePasswordChange } = require("../middleware/validateSettings");
const { getProfileDetails, editProfile, editAppearance, editNameSocials, changePassword} = require('../controllers/settingsController');

// Route that returns information about the specified user
// stored in the 'profile' database table.
router.post('/profiledetails', getProfileDetails);

// Route that updates the user's pfp and bio
router.post('/editprofile', editProfile);

// Route that updates the user's light or dark mode preference
router.post('/editappearance', editAppearance);

// Route that updates the user's username and social media links
router.post('/editnamesocials', validateNameSocials, editNameSocials);

// Route that updates the user's password
router.post('/changepassword', validatePasswordChange, changePassword);

module.exports = router;
