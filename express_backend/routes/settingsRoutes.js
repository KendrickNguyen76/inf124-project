const express = require('express');
const router = express.Router();
const { getProfileDetails, editProfile } = require('../controllers/settingsController');

// Route that returns information about the specified user
// stored in the 'profile' database table
router.post('/profiledetails', getProfileDetails);

// Route that updates the user's pfp and bio
// router.post('/editprofile', editProfile);

module.exports = router;
