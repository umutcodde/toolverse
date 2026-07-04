// ============================================================
// utils/tokenGenerator.js
// JWT ve email doğrulama tokenları
// ============================================================
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// JWT token oluştur (15 dakika geçerli)
const generateJWT = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '15d' }
  );
};

// Email doğrulama tokeni (24 saat geçerli)
const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Şifre sıfırlama tokeni (1 saat geçerli)
const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Token'ı hash'le (veritabanına güvenli şekilde saklamak için)
const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

module.exports = {
  generateJWT,
  generateVerificationToken,
  generateResetToken,
  hashToken
};
