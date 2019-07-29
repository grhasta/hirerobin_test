const jwt = require('jsonwebtoken');
const secret = process.env.APP_SECRET || 'thisisoursecret';

const withAuth = function(req, res, next) {
  const token = 
    req.body.token ||
    req.query.token ||
    req.headers['authorization'] ||
    req.cookies.token;
  console.log(token)
  if (!token) {
    res.status(401).json({ error: 'Unauthorized: No token provided' });
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
}

module.exports = withAuth;