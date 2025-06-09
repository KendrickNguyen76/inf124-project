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


module.exports = { validateNameSocials, };
