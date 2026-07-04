// ============================================================
// utils/emailTemplates.js
// Email şablonları
// ============================================================

const verificationEmailTemplate = (verificationLink) => `
  <div style="font-family: 'Inter', sans-serif; max-width: 500px; margin: 0 auto;">
    <h2 style="color: #5B5FEF; margin-bottom: 20px;">ToolVerse'e Hoş Geldiniz! 🎉</h2>
    <p style="color: #666; font-size: 16px; line-height: 1.6;">Hesabınızı aktivate etmek için aşağıdaki linke tıklayınız:</p>
    <a href="${verificationLink}" style="background: #5B5FEF; color: white; padding: 14px 30px; border-radius: 8px; text-decoration: none; display: inline-block; margin: 20px 0; font-weight: 600;">
      Email'i Doğrula
    </a>
    <p style="color: #999; font-size: 13px; margin-top: 30px;">Veya bu linki tarayıcınıza kopyalayınız:</p>
    <code style="background: #f5f5f5; padding: 10px; display: block; border-radius: 6px; word-break: break-all; font-size: 12px;">${verificationLink}</code>
    <p style="color: #999; font-size: 12px; margin-top: 20px;">Bu link 24 saat geçerlidir.</p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
    <p style="color: #999; font-size: 12px; text-align: center;">© 2026 ToolVerse. Tüm hakları saklıdır.</p>
  </div>
`;

const resetPasswordEmailTemplate = (resetLink) => `
  <div style="font-family: 'Inter', sans-serif; max-width: 500px; margin: 0 auto;">
    <h2 style="color: #5B5FEF; margin-bottom: 20px;">Şifrenizi Sıfırlayınız 🔐</h2>
    <p style="color: #666; font-size: 16px; line-height: 1.6;">Şifrenizi sıfırlamak için aşağıdaki linke tıklayınız:</p>
    <a href="${resetLink}" style="background: #5B5FEF; color: white; padding: 14px 30px; border-radius: 8px; text-decoration: none; display: inline-block; margin: 20px 0; font-weight: 600;">
      Şifreyi Sıfırla
    </a>
    <p style="color: #999; font-size: 13px; margin-top: 30px;">Veya bu linki tarayıcınıza kopyalayınız:</p>
    <code style="background: #f5f5f5; padding: 10px; display: block; border-radius: 6px; word-break: break-all; font-size: 12px;">${resetLink}</code>
    <p style="color: #999; font-size: 12px; margin-top: 20px;">⚠️ Bu link 1 saat geçerlidir. Eğer bu isteği siz yapmadıysanız, bu emaili görmezden geliniz.</p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
    <p style="color: #999; font-size: 12px; text-align: center;">© 2026 ToolVerse. Tüm hakları saklıdır.</p>
  </div>
`;

module.exports = {
  verificationEmailTemplate,
  resetPasswordEmailTemplate
};
