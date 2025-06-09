const { supabase } = require('../services/supabaseClient');

async function getUserThemeBool(req, res) {
    const {token} = req.body;
    const {data: {user}} = await supabase.auth.getUser(token);


  const { data: user_profile, error } = await supabase
    .from('profile')
    .select('is_light')
    .eq('id', user.id);

  if (error) return res.status(500).json({ error: error.message });
  res.json(user_profile[0]);
}

module.exports = {getUserThemeBool};