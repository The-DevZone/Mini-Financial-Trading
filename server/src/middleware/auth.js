const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

function auth(required = true) {
  return (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
      if (required) return res.status(401).json({ success: false, message: 'No token' });
      req.user = null; return next();
    }
    try {
      const payload = jwt.verify(token, jwtSecret);
      req.user = payload;
      next();
    } catch {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
  };
}
function requireAdmin(req, res, next) {
  if (req.user?.isAdmin) return next();
  return res.status(403).json({ success: false, message: 'Admin only' });
}
module.exports = { auth, requireAdmin };