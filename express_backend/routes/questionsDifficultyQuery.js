const express = require('express');
const router = express.Router();
const { getQuestionsByDifficulty } = require('../controllers/questionsDifficultyController');

router.get('/', getQuestionsByDifficulty);

module.exports = router;