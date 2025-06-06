const express = require('express');
const router = express.Router();
const { getProfileDetails } = require('../controllers/settingsController');

// Route that returns information about the specified user
// stored in the 'profile' database table
router.post('/profiledetails', getProfileDetails);

module.exports = router;
