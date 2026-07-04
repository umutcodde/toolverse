// ============================================================
// routes/auth.routes.js
// Tüm /api/auth/* uç noktalarının tanımı.
// Brute-force saldırılarına karşı rate limiting uygulanır.
// ============================================================
const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();

const {
  register, verifyEmail, login, logout, forgotPassword, resetPassword, me
} = require('../controllers/auth.controller');
const { requireAuth } = require('../middleware/auth.middleware');

// Giriş denemelerini sınırla: 10 dakikada en fazla 10 deneme (aynı IP)
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: { message: 'Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar dene.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Kayıt/şifre sıfırlama isteklerini sınırla: saatte en fazla 5 (spam/kötüye kullanım önleme)
const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { message: 'Çok fazla istek gönderildi. Lütfen daha sonra tekrar dene.' },
  standardHeaders: true,
  legacyHeaders: false
});

router.post('/register', strictLimiter, register);
router.get('/verify-email', verifyEmail);
router.post('/login', loginLimiter, login);
router.post('/logout', logout);
router.post('/forgot-password', strictLimiter, forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', requireAuth, me);

module.exports = router;
