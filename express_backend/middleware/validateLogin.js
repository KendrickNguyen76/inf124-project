function validateLogin(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  next();
}

module.exports = validateLogin;