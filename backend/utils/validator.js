// ============================================================
// utils/validator.js
// Giriş doğrulaması
// ============================================================

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.length <= 255;
};

const validatePassword = (password) => {
  // Min 8 karakter, en az bir büyük harf, bir küçük harf, bir sayı
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return re.test(password);
};

const getPasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z\d]/.test(password)) strength++;
  
  const levels = ['Çok Zayıf', 'Zayıf', 'Orta', 'İyi', 'Güçlü', 'Çok Güçlü'];
  return levels[Math.min(strength, 5)];
};

module.exports = {
  validateEmail,
  validatePassword,
  getPasswordStrength
};
