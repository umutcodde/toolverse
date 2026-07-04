// ============================================================
// controllers/authController.js
// Kimlik doğrulama işleyicileri
// ============================================================
const bcrypt = require('bcrypt');
const pool = require('../config/database');
const { sendEmail } = require('../config/email');
const {
  generateJWT,
  generateVerificationToken,
  generateResetToken,
  hashToken
} = require('../utils/tokenGenerator');
const {
  verificationEmailTemplate,
  resetPasswordEmailTemplate
} = require('../utils/emailTemplates');
const { validateEmail, validatePassword } = require('../utils/validator');

// ==================== REGISTER ====================
exports.register = async (req, res) => {
  try {
    const { email, password, passwordConfirm } = req.body;

    // Doğrulama
    if (!email || !password || !passwordConfirm) {
      return res.status(400).json({ message: 'Tüm alanlar zorunludur.' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Geçerli bir email adresi giriniz.' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        message: 'Şifre en az 8 karakter olmalı ve büyük harf, küçük harf, sayı içermelidir.'
      });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({ message: 'Şifreler eşleşmiyor.' });
    }

    // Email zaten kayıtlı mı?
    const result = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      return res.status(400).json({
        message: 'Bu email adresi zaten kayıtlı.'
      });
    }

    // Şifreyi hash'le
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kullanıcı oluştur
    const userResult = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword]
    );
    const userId = userResult.rows[0].id;

    // Doğrulama token'ı oluştur
    const verificationToken = generateVerificationToken();
    const tokenHash = hashToken(verificationToken);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 saat

    await pool.query(
      'INSERT INTO email_verification_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)',
      [userId, tokenHash, expiresAt]
    );

    // Doğrulama emaili gönder
    const verificationLink = `${process.env.FRONTEND_URL}/auth/verify-email?token=${verificationToken}`;
    const html = verificationEmailTemplate(verificationLink);

    await sendEmail(email, 'ToolVerse — Email Doğrulaması', html);

    res.status(201).json({
      message: 'Kayıt başarılı! Email adresinizi doğrulamak için bir link gönderdik.',
      userId
    });
  } catch (err) {
    console.error('Register hatası:', err);
    res.status(500).json({ message: 'Kayıt sırasında hata oluştu.' });
  }
};

// ==================== VERIFY EMAIL ====================
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: 'Doğrulama token\'ı bulunamadı.' });
    }

    const tokenHash = hashToken(token);

    // Token'ı kontrol et
    const result = await pool.query(
      `SELECT user_id, expires_at FROM email_verification_tokens 
       WHERE token_hash = $1 AND expires_at > NOW()`,
      [tokenHash]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Geçersiz veya süresi geçmiş token.' });
    }

    const userId = result.rows[0].user_id;

    // Kullanıcıyı doğrulı olarak işaretle
    await pool.query('UPDATE users SET is_verified = TRUE WHERE id = $1', [userId]);

    // Token'ı sil
    await pool.query('DELETE FROM email_verification_tokens WHERE token_hash = $1', [tokenHash]);

    res.json({ message: 'Email başarıyla doğrulandı! Giriş yapabilirsiniz.' });
  } catch (err) {
    console.error('Verify email hatası:', err);
    res.status(500).json({ message: 'Doğrulama sırasında hata oluştu.' });
  }
};

// ==================== LOGIN ====================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email ve şifre gerekli.' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Geçerli bir email adresi giriniz.' });
    }

    // Kullanıcıyı bul
    const result = await pool.query(
      'SELECT id, password_hash, is_verified FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Email veya şifre hatalı.' });
    }

    const user = result.rows[0];

    // Email doğrulanmış mı?
    if (!user.is_verified) {
      return res.status(403).json({
        message: 'Email adresiniz henüz doğrulanmadı. Lütfen email adresinizi kontrol ediniz.'
      });
    }

    // Şifreyi kontrol et
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Email veya şifre hatalı.' });
    }

    // JWT token oluştur
    const token = generateJWT(user.id);

    // httpOnly cookie'ye set et
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 15 * 24 * 60 * 60 * 1000 // 15 gün
    });

    // Aktivite kaydı
    await pool.query(
      'INSERT INTO user_activity (user_id, action, ip_address) VALUES ($1, $2, $3)',
      [user.id, 'login', req.ip]
    );

    res.json({
      message: 'Giriş başarılı!',
      userId: user.id
    });
  } catch (err) {
    console.error('Login hatası:', err);
    res.status(500).json({ message: 'Giriş sırasında hata oluştu.' });
  }
};

// ==================== LOGOUT ====================
exports.logout = (req, res) => {
  res.clearCookie('authToken');
  res.json({ message: 'Çıkış yapıldı.' });
};

// ==================== GET CURRENT USER ====================
exports.getMe = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, is_verified, created_at FROM users WHERE id = $1',
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('GetMe hatası:', err);
    res.status(500).json({ message: 'Hata oluştu.' });
  }
};

// ==================== FORGOT PASSWORD ====================
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !validateEmail(email)) {
      return res.status(400).json({ message: 'Geçerli bir email adresi giriniz.' });
    }

    // Kullanıcıyı bul
    const result = await pool.query('SELECT id FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      // Email enumeration atağını önlemek için aynı mesaj
      return res.json({ message: 'Eğer bu email kayıtlıysa, şifre sıfırlama linki gönderildi.' });
    }

    const userId = result.rows[0].id;

    // Reset token oluştur
    const resetToken = generateResetToken();
    const tokenHash = hashToken(resetToken);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 saat

    await pool.query(
      'INSERT INTO password_reset_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)',
      [userId, tokenHash, expiresAt]
    );

    // Şifre sıfırlama emaili gönder
    const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${resetToken}`;
    const html = resetPasswordEmailTemplate(resetLink);

    await sendEmail(email, 'ToolVerse — Şifre Sıfırlama', html);

    res.json({ message: 'Eğer bu email kayıtlıysa, şifre sıfırlama linki gönderildi.' });
  } catch (err) {
    console.error('Forgot password hatası:', err);
    res.status(500).json({ message: 'Hata oluştu.' });
  }
};

// ==================== RESET PASSWORD ====================
exports.resetPassword = async (req, res) => {
  try {
    const { token, password, passwordConfirm } = req.body;

    if (!token || !password || !passwordConfirm) {
      return res.status(400).json({ message: 'Tüm alanlar zorunludur.' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        message: 'Şifre en az 8 karakter olmalı ve büyük harf, küçük harf, sayı içermelidir.'
      });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({ message: 'Şifreler eşleşmiyor.' });
    }

    const tokenHash = hashToken(token);

    // Token'ı kontrol et
    const result = await pool.query(
      `SELECT user_id FROM password_reset_tokens 
       WHERE token_hash = $1 AND expires_at > NOW()`,
      [tokenHash]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Geçersiz veya süresi geçmiş token.' });
    }

    const userId = result.rows[0].user_id;

    // Yeni şifreyi hash'le ve güncelle
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [hashedPassword, userId]);

    // Token'ı sil
    await pool.query('DELETE FROM password_reset_tokens WHERE token_hash = $1', [tokenHash]);

    res.json({ message: 'Şifre başarıyla sıfırlandı. Giriş yapabilirsiniz.' });
  } catch (err) {
    console.error('Reset password hatası:', err);
    res.status(500).json({ message: 'Hata oluştu.' });
  }
};
