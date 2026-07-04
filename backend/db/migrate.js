// ============================================================
// db/migrate.js
// schema.sql dosyasını veritabanına uygular.
// Çalıştırma: npm run migrate
// ============================================================
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

async function migrate() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    console.log('📦 Şema uygulanıyor...');
    await pool.query(schemaSql);
    console.log('✅ Veritabanı şeması başarıyla oluşturuldu/güncellendi.');
  } catch (err) {
    console.error('❌ Migration hatası:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate();
