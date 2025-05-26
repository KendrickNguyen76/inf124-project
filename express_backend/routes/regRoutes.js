const express = require('express');
const router = express.Router();
const validateRegister = require('../middleware/validateRegister');
const { register } = require('../controllers/registerController');

router.post('/', validateRegister, register);

module.exports = router;