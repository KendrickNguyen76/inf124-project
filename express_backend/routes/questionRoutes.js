const express = require('express');
const router = express.Router();
const { getQuestionById } = require('../controllers/questionController');

router.get('/:id', getQuestionById);

module.exports = router;