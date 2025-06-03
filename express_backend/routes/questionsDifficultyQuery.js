const express = require('express');
const router = express.Router();
const { supabase } = require('../services/supabaseClient');

router.get('/questionsdifficultyquery', async (req, res) => {
  const difficulty = req.query.difficulty;

  const { data, error } = await supabase
    .from('question_table')
    .select('*')
    .eq('difficulty', difficulty);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

module.exports = router;