// ============================================================
// utils/tokens.js
// E-posta doğrulama ve şifre sıfırlama için kullanılan
// tek kullanımlık, kriptografik olarak güvenli token'lar.
//
// ÖNEMLİ: Token'ın kendisi e-posta ile gönderilir, ama
// veritabanında SADECE SHA-256 hash'i saklanır. Böylece
// veritabanı sızsa bile ham token'lar ele geçirilemez —
// aynı şifrelerde olduğu gibi.
// ============================================================
const crypto = require('crypto');

/**
 * Rastgele, URL-güvenli bir token üretir (kullanıcıya e-postayla gidecek olan).
 */
function generateRawToken() {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Ham token'ı veritabanında saklanacak hash'e çevirir.
 */
function hashToken(rawToken) {
  return crypto.createHash('sha256').update(rawToken).digest('hex');
}

/**
 * Şu andan itibaren belirtilen dakika sonrasının Date objesini döner.
 */
function minutesFromNow(minutes) {
  return new Date(Date.now() + minutes * 60 * 1000);
}

module.exports = { generateRawToken, hashToken, minutesFromNow };
