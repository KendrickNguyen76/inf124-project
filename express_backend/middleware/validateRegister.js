function validateRegister(req, res, next) {
  const { email, password, username, name } = req.body;
  if (!email || !password || !username || !name) {
    return res.status(400).json({ error: "All fields are required." });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters." });
  }
  next();
}

module.exports = validateRegister;