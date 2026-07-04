// ============================================================
// utils/email.js
// SMTP üzerinden doğrulama ve şifre sıfırlama e-postalarını gönderir.
// Herhangi bir SMTP sağlayıcısı çalışır (Resend, SendGrid, Mailgun, Gmail...).
// ============================================================
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465, // 465 ise SSL, diğerlerinde STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

function wrapTemplate(title, bodyHtml) {
  return `
  <div style="font-family: Arial, sans-serif; max-width:480px; margin:0 auto; padding:32px; background:#FAFAFF; border-radius:16px;">
    <h2 style="color:#14142B; margin-bottom:16px;">${title}</h2>
    <div style="color:#3a3a52; font-size:14px; line-height:1.6;">${bodyHtml}</div>
    <p style="color:#8B8FA8; font-size:12px; margin-top:32px;">Bu e-postayı sen istemediysen görmezden gelebilirsin.</p>
  </div>`;
}

async function sendVerificationEmail(toEmail, rawToken) {
  const link = `${process.env.FRONTEND_URL}/auth/verify-notice.html?token=${rawToken}`;
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: toEmail,
    subject: 'ToolVerse — E-posta Adresini Doğrula',
    html: wrapTemplate(
      'E-posta Adresini Doğrula',
      `Hesabını aktifleştirmek için aşağıdaki butona tıkla:
       <p style="text-align:center; margin:24px 0;">
         <a href="${link}" style="background:#5B5FEF; color:white; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:600;">E-postamı Doğrula</a>
       </p>
       <p>Buton çalışmazsa şu bağlantıyı tarayıcına yapıştır:<br>${link}</p>
       <p>Bu bağlantı 24 saat geçerlidir.</p>`
    )
  });
}

async function sendPasswordResetEmail(toEmail, rawToken) {
  const link = `${process.env.FRONTEND_URL}/auth/reset-password.html?token=${rawToken}`;
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: toEmail,
    subject: 'ToolVerse — Şifre Sıfırlama',
    html: wrapTemplate(
      'Şifreni Sıfırla',
      `Şifreni sıfırlamak için aşağıdaki butona tıkla:
       <p style="text-align:center; margin:24px 0;">
         <a href="${link}" style="background:#5B5FEF; color:white; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Şifremi Sıfırla</a>
       </p>
       <p>Buton çalışmazsa şu bağlantıyı tarayıcına yapıştır:<br>${link}</p>
       <p>Bu bağlantı 1 saat geçerlidir. Bu isteği sen yapmadıysan hesabın güvende, herhangi bir işlem yapmana gerek yok.</p>`
    )
  });
}

module.exports = { sendVerificationEmail, sendPasswordResetEmail };
