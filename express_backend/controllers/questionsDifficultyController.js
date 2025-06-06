const { supabase } = require('../services/supabaseClient');

async function getQuestionsByDifficulty(req, res) {
  const difficulty = req.query.difficulty;

  /*console.log("Querying Supabase for difficulty:", difficulty);*/

  const { data, error } = await supabase
    .from('question_bank')
    .select('*')
    .eq('difficulty', difficulty);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}

module.exports = { getQuestionsByDifficulty };