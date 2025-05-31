const { supabase } = require("../services/supabaseClient");

async function register(req, res) {
  const { email, password, username, name } = req.body;

  console.log("Registration attempt:", { email, username, name });
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { 
        display_name: username,
        username, //trigger for custom table
        name 
    },
    },
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({ user: data.user });
}

module.exports = { register };
