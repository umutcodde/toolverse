// ============================================================
// utils/hash.js
// Şifreler ASLA düz metin (plaintext) olarak saklanmaz.
// bcrypt, her şifre için otomatik salt üretir ve tek yönlü
// (geri döndürülemez) bir hash oluşturur.
// ============================================================
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12; // Güvenlik/performans dengesi için önerilen değer

/**
 * Düz metin şifreyi hash'ler.
 * @param {string} plainPassword
 * @returns {Promise<string>} hash'lenmiş şifre
 */
async function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

/**
 * Girilen şifreyi, veritabanındaki hash ile karşılaştırır.
 * @param {string} plainPassword
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
async function comparePassword(plainPassword, hash) {
  return bcrypt.compare(plainPassword, hash);
}

module.exports = { hashPassword, comparePassword };
