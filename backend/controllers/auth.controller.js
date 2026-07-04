// ============================================================
// controllers/auth.controller.js
// Kayıt, giriş, çıkış, e-posta doğrulama ve şifre sıfırlama
// iş mantığının tamamı burada.
// ============================================================
const validator = require('validator');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateRawToken, hashToken, minutesFromNow } = require('../utils/tokens');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../utils/email');

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).{8,}$/; // en az 8 karakter, 1 büyük harf, 1 rakam

function signJwt(user) {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

function setAuthCookie(res, token) {
  res.cookie('token', token, {
    httpOnly: true,               // JS ile erişilemez → XSS'e karşı korur
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 gün
  });
}

// ------------------------------------------------------------
// POST /api/auth/register
// ------------------------------------------------------------
async function register(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ message: 'Geçerli bir e-posta adresi girin.' });
    }
    if (!password || !PASSWORD_REGEX.test(password)) {
      return res.status(400).json({ message: 'Şifre en az 8 karakter, bir büyük harf ve bir rakam içermeli.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existing = await pool.query('SELECT id FROM users WHERE LOWER(email) = $1', [normalizedEmail]);
    if (existing.rows.length > 0) {
      // Kullanıcı zaten var olsa da aynı genel mesajı dönmek e-posta numaralandırma
      // (email enumeration) saldırılarını zorlaştırır.
      return res.status(200).json({ message: 'Eğer bu e-posta uygunsa, doğrulama bağlantısı gönderildi.' });
    }

    const passwordHash = await hashPassword(password);
    const rawToken = generateRawToken();
    const tokenHash = hashToken(rawToken);
    const expiresAt = minutesFromNow(Number(process.env.EMAIL_VERIFICATION_EXPIRES_MIN) || 1440);

    await pool.query(
      `INSERT INTO users (email, password_hash, email_verification_token_hash, email_verification_expires)
       VALUES ($1, $2, $3, $4)`,
      [normalizedEmail, passwordHash, tokenHash, expiresAt]
    );

    await sendVerificationEmail(normalizedEmail, rawToken);

    return res.status(201).json({ message: 'Kayıt başarılı! Doğrulama bağlantısı e-postana gönderildi.' });
  } catch (err) {
    console.error('register hatası:', err);
    return res.status(500).json({ message: 'Sunucu hatası, lütfen daha sonra tekrar dene.' });
  }
}

// ------------------------------------------------------------
// GET /api/auth/verify-email?token=...
// ------------------------------------------------------------
async function verifyEmail(req, res) {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ message: 'Token eksik.' });

    const tokenHash = hashToken(token);
    const result = await pool.query(
      `SELECT id FROM users
       WHERE email_verification_token_hash = $1
       AND email_verification_expires > now()`,
      [tokenHash]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Bağlantının süresi dolmuş veya geçersiz.' });
    }

    await pool.query(
      `UPDATE users
       SET is_verified = TRUE, email_verification_token_hash = NULL, email_verification_expires = NULL
       WHERE id = $1`,
      [result.rows[0].id]
    );

    return res.status(200).json({ message: 'E-posta başarıyla doğrulandı.' });
  } catch (err) {
    console.error('verifyEmail hatası:', err);
    return res.status(500).json({ message: 'Sunucu hatası.' });
  }
}

// ------------------------------------------------------------
// POST /api/auth/login
// ------------------------------------------------------------
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'E-posta ve şifre gerekli.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const result = await pool.query(
      'SELECT id, email, password_hash, is_verified FROM users WHERE LOWER(email) = $1',
      [normalizedEmail]
    );

    // Kullanıcı bulunamasa bile aynı hata mesajını dön (bilgi sızdırmamak için)
    const genericError = { message: 'E-posta veya şifre hatalı.' };
    if (result.rows.length === 0) return res.status(401).json(genericError);

    const user = result.rows[0];
    const passwordMatches = await comparePassword(password, user.password_hash);
    if (!passwordMatches) return res.status(401).json(genericError);

    if (!user.is_verified) {
      return res.status(403).json({ message: 'Lütfen önce e-posta adresini doğrula.' });
    }

    const token = signJwt(user);
    setAuthCookie(res, token);

    return res.status(200).json({
      message: 'Giriş başarılı.',
      token, // localStorage kullanmak isteyenler için de döndürülüyor
      user: { id: user.id, email: user.email }
    });
  } catch (err) {
    console.error('login hatası:', err);
    return res.status(500).json({ message: 'Sunucu hatası.' });
  }
}

// ------------------------------------------------------------
// POST /api/auth/logout
// ------------------------------------------------------------
async function logout(req, res) {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Çıkış yapıldı.' });
}

// ------------------------------------------------------------
// POST /api/auth/forgot-password
// ------------------------------------------------------------
async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const genericResponse = { message: 'Eğer bu e-posta kayıtlıysa, sıfırlama bağlantısı gönderildi.' };

    if (!email || !validator.isEmail(email)) {
      return res.status(200).json(genericResponse); // yine de bilgi sızdırma
    }

    const normalizedEmail = email.toLowerCase().trim();
    const result = await pool.query('SELECT id FROM users WHERE LOWER(email) = $1', [normalizedEmail]);

    if (result.rows.length > 0) {
      const rawToken = generateRawToken();
      const tokenHash = hashToken(rawToken);
      const expiresAt = minutesFromNow(Number(process.env.PASSWORD_RESET_EXPIRES_MIN) || 60);

      await pool.query(
        `UPDATE users
         SET password_reset_token_hash = $1, password_reset_expires = $2
         WHERE id = $3`,
        [tokenHash, expiresAt, result.rows[0].id]
      );

      await sendPasswordResetEmail(normalizedEmail, rawToken);
    }

    // Kullanıcı var mı yok mu fark etmeksizin aynı mesaj — email enumeration önlemi
    return res.status(200).json(genericResponse);
  } catch (err) {
    console.error('forgotPassword hatası:', err);
    return res.status(500).json({ message: 'Sunucu hatası.' });
  }
}

// ------------------------------------------------------------
// POST /api/auth/reset-password
// ------------------------------------------------------------
async function resetPassword(req, res) {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ message: 'Token ve yeni şifre gerekli.' });
    }
    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({ message: 'Şifre en az 8 karakter, bir büyük harf ve bir rakam içermeli.' });
    }

    const tokenHash = hashToken(token);
    const result = await pool.query(
      `SELECT id FROM users
       WHERE password_reset_token_hash = $1
       AND password_reset_expires > now()`,
      [tokenHash]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Bağlantının süresi dolmuş veya geçersiz.' });
    }

    const newHash = await hashPassword(password);
    await pool.query(
      `UPDATE users
       SET password_hash = $1, password_reset_token_hash = NULL, password_reset_expires = NULL
       WHERE id = $2`,
      [newHash, result.rows[0].id]
    );

    return res.status(200).json({ message: 'Şifre başarıyla güncellendi.' });
  } catch (err) {
    console.error('resetPassword hatası:', err);
    return res.status(500).json({ message: 'Sunucu hatası.' });
  }
}

// ------------------------------------------------------------
// GET /api/auth/me  (giriş yapmış kullanıcı bilgisi — korumalı rota örneği)
// ------------------------------------------------------------
async function me(req, res) {
  try {
    const result = await pool.query('SELECT id, email, is_verified, created_at FROM users WHERE id = $1', [req.user.userId]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    return res.status(200).json({ user: result.rows[0] });
  } catch (err) {
    console.error('me hatası:', err);
    return res.status(500).json({ message: 'Sunucu hatası.' });
  }
}

module.exports = { register, verifyEmail, login, logout, forgotPassword, resetPassword, me };
