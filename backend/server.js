// ============================================================
// server.js
// ToolVerse Auth API — giriş noktası.
// Güvenlik: Helmet, CORS (whitelist), rate limiting, httpOnly cookie.
// ============================================================
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');

const app = express();

// --- Güvenlik başlıkları ---
app.use(helmet());

// --- CORS: sadece frontend domainine izin ver ---
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true // httpOnly cookie gönderebilmek için gerekli
}));

// --- Body/cookie parsing ---
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

// --- Sağlık kontrolü (deploy sonrası test için) ---
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'toolverse-auth-api' });
});

// --- Auth rotaları ---
app.use('/api/auth', authRoutes);

// --- 404 ---
app.use((req, res) => {
  res.status(404).json({ message: 'Uç nokta bulunamadı.' });
});

// --- Genel hata yakalayıcı ---
app.use((err, req, res, next) => {
  console.error('Beklenmeyen hata:', err);
  res.status(500).json({ message: 'Sunucu hatası.' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ ToolVerse Auth API ${PORT} portunda çalışıyor.`);
});
