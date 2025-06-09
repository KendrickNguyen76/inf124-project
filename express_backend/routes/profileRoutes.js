const express = require('express');
const router = express.Router();
const { getEntireUserProfile } = require('../controllers/profileController');

// Route that returns information about the specified user
// stored in the 'profile' database table
router.post('/', getProfileDetails);

module.exports = router;
