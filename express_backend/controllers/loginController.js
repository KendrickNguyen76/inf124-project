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

async function forgotPassword(req, res) {
  const { email } = req.body;
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/update-password" // Change to your frontend URL
  });
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.json({ message: "Password reset email sent" });
  
}

async function updatePassword(req, res) {
  const { password, access_token } = req.body;
  if (!password || !access_token) {
    return res.status(400).json({ error: "Missing password or access token" });
  }

  // Use the user's access token from the magic link to update password
  const { data, error } = await supabase.auth.api.updateUser(access_token, { password });
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.json({ message: "Password updated successfully" });
}

module.exports = { login, forgotPassword, updatePassword };
