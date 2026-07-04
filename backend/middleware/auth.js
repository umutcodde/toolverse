// ============================================================
// middleware/auth.js
// JWT doğrulama middleware'i
// ============================================================
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ message: 'Token bulunamadı.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Geçersiz veya süresi geçmiş token.' });
  }
};

module.exports = authMiddleware;
