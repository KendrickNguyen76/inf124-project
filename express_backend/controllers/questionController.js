const { supabase } = require('../services/supabaseClient');

async function getQuestionById(req, res) {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('question_bank')
    .select('starter_code, test_cases, wrapper_code, name')
    .eq('id', id)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}

module.exports = { getQuestionById };