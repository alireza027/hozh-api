const jwt = require('jsonwebtoken');
function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        req.errorForbidden = "Forbidden";
    } // if there isn't any token

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            req.errorUnauthorized = "Unauthorized";
        }
        req.user = user;
        next() // pass the execution off to whatever request the client intended
    })
}
module.exports = authenticateToken;