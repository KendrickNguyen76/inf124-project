const { supabase } = require("../services/supabaseClient");

async function register(req, res) {
  const { email, password, username, name, pfp } = req.body;

  console.log("Registration attempt:", { email, username, name, pfp});
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { 
        username, //trigger for custom table
        name,
        pfp,
    },
    },
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({ user: data.user });
}

module.exports = { register };
