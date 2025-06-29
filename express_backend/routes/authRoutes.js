const express = require("express");
const router = express.Router();
const validateLogin = require("../middleware/validateLogin");
const { login, forgotPassword, updatePassword, validateSession } = require("../controllers/loginController");

router.post("/", validateLogin, login);
router.post("/forgot-password", forgotPassword);
router.post("/update-password", updatePassword);
router.post("/validate-session", validateSession);

module.exports = router;