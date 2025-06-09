const express = require('express');
const router = express.Router();
const { getUserThemeBool } = require('../controllers/themeController');

// Route that returns information about the specified user
// stored in the 'profile' database table
router.post('/', getUserThemeBool);

module.exports = router;