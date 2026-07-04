// ============================================================
// middleware/rateLimiter.js
// Rate limiting — brute force saldırılarına karşı koruma
// ============================================================
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 5, // 15 dakikada max 5 deneme
  message: 'Çok fazla giriş denemesi. Lütfen 15 dakika sonra tekrar deneyin.',
  standardHeaders: true,
  legacyHeaders: false
});

const generalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 dakika
  max: 30,
  message: 'Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin.'
});

module.exports = { authLimiter, generalLimiter };
