const express = require('express');
const router = express.Router();
const validateLogin = require('../middleware/validateLogin');
const { supabase } = require('../services/supabaseClient');

router.post('/login', validateLogin, async (req, res) => {
  const { username, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: username, 
    password: password,
  });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  res.json({ user: data.user, session: data.session });
});

module.exports = router;