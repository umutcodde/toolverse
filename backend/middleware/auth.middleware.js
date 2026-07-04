// ============================================================
// middleware/auth.middleware.js
// Gelen isteklerdeki JWT'yi doğrular (cookie veya Authorization header'dan).
// Korumalı rotalarda (örn: kullanıcı profili) kullanılır.
// ============================================================
const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const bearerToken = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.split(' ')[1]
    : null;
  const token = req.cookies?.token || bearerToken;

  if (!token) {
    return res.status(401).json({ message: 'Giriş yapmanız gerekiyor.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { userId, email }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Oturum geçersiz veya süresi dolmuş.' });
  }
}

module.exports = { requireAuth };
