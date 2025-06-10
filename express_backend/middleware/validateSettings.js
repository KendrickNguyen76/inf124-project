// validateSettings.js

// validateNameSocials()
// Validates that the user's new username and social
// media links are valid
function validateNameSocials(req, res, next) {
    const { token, newUserName, newLinks } = req.body;
    
    if (newUserName.length == 0) {
        return res.status(400).json({ error: "Username cannot be empty" });
    }

    next();
}

// validatePasswordChange()
// Validates that the password and the confirmed password
// are the same
function validatePasswordChange(req, res, next) {
    const {token, newPassword, confirmPassword} = req.body;

    if (!(newPassword === confirmPassword)) {
        return res.status(400).json({ error: "Provided passwords must be the same" });
    }

    next();
}

module.exports = { validateNameSocials, validatePasswordChange, };
