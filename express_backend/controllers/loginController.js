const jwt = require("jsonwebtoken");
const { supabase, supabaseAdmin } = require("../services/supabaseClient");
const API_URL =
  import.meta.env.FRONTEND_URL?.replace(/\/$/, "") || "http://localhost:3000";

async function login(req, res) {
  const { username, password } = req.body;
  console.log("Login attempt:", { username, password });

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
    redirectTo: `${API_URL}/update-password`,
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

  try {
    const decoded = jwt.decode(access_token);
    const userId = decoded?.sub;
    if (!userId) {
      return res.status(400).json({ error: "Invalid access token" });
    }

    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      userId,
      { password }
    );

    if (error) {
      console.error("Supabase updateUserById error:", error);
      return res.status(400).json({ error: error.message });
    }
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function validateSession(req, res) {
  const { token } = req.body;
  if (!token)
    return res.status(400).json({ valid: false, error: "No token provided" });
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);
  if (error || !user) return res.status(401).json({ valid: false });
  res.json({ valid: true, user });
}

module.exports = { login, forgotPassword, updatePassword, validateSession };
