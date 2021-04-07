const jwt = require('jsonwebtoken');
function generateAccessToken(email, password, _id, lore) {
    return jwt.sign({ email: email, password: password, _id: _id, lore: lore }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });
}
module.exports = generateAccessToken;