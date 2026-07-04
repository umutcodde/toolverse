// ============================================================
// config/db.js
// PostgreSQL bağlantı havuzunu (pool) oluşturur ve dışa aktarır.
// Tüm sorgular bu pool üzerinden yapılır (connection reuse için).
// ============================================================
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Çoğu hosted Postgres sağlayıcısı (Neon, Supabase, Render) SSL gerektirir.
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false
});

pool.on('error', (err) => {
  console.error('Beklenmeyen PostgreSQL havuz hatası:', err);
});

module.exports = pool;
