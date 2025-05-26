const { supabase } = require('../services/supabaseClient');

async function login(req, res) {
  const { username, password } = req.body;

  console.log('Login attempt:', { username, password });

  const { data, error } = await supabase.auth.signInWithPassword({
    email: username,
    password: password,
  });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  res.json({ user: data.user, session: data.session });
}

module.exports = { login };