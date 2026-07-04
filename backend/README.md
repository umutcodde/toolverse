# ToolVerse Auth API

Email/şifre kayıt, giriş, e-posta doğrulama ve şifre sıfırlama sistemi.

## Güvenlik özeti
- Şifreler **bcrypt** ile hash'lenir (asla plaintext saklanmaz)
- E-posta doğrulama ve şifre sıfırlama token'ları **SHA-256 hash'lenerek** saklanır
- JWT, **httpOnly cookie** olarak set edilir (XSS'e karşı korumalı)
- Giriş/kayıt uç noktalarında **rate limiting** var
- `helmet` ile güvenlik başlıkları, `cors` ile whitelist domain kontrolü
- Email enumeration önleme: kayıtlı olmayan e-postalar için de aynı genel mesaj dönülür

## Neden bu sandbox'ta çalıştıramıyorum?
Bu kod, gerçek bir PostgreSQL veritabanı ve internet erişimi (SMTP için) gerektirir.
Claude'un kod yazdığı ortamda internet bağlantısı kapalı ve kalıcı bir veritabanı yok.
Bu yüzden kodu **sana tam ve eksiksiz teslim ediyorum**, çalıştırmak için aşağıdaki adımları
kendi bilgisayarında veya bir sunucuda uygulaman gerekiyor.

## Kurulum Adımları

### 1) Veritabanı oluştur
Ücretsiz bir PostgreSQL sağlayıcısı seç:
- [Neon](https://neon.tech) (önerilen, ücretsiz katman var)
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)

Bağlantı adresini (`postgresql://...`) kopyala.

### 2) SMTP (e-posta gönderimi) hesabı al
- [Resend](https://resend.com) (önerilen, kolay kurulum, ücretsiz katman var)
- veya SendGrid / Mailgun / Gmail SMTP

### 3) Ortam değişkenlerini ayarla
```bash
cp .env.example .env
# .env dosyasını gerçek DATABASE_URL, JWT_SECRET, SMTP bilgileriyle doldur
```

Rastgele güçlü bir JWT_SECRET üretmek için:
```bash
openssl rand -hex 64
```

### 4) Bağımlılıkları kur
```bash
npm install
```

### 5) Veritabanı şemasını oluştur
```bash
npm run migrate
```

### 6) Sunucuyu başlat
```bash
npm start
# geliştirme için: npm run dev
```

### 7) Test et
```bash
curl http://localhost:4000/api/health
# {"status":"ok","service":"toolverse-auth-api"}
```

## Deploy (canlıya alma)

Bu Express sunucusunu Vercel'in **statik** frontend'inden ayrı olarak deploy etmen gerekiyor
(Vercel serverless sınırlı bağlantı süresi nedeniyle sürekli PostgreSQL bağlantısı için ideal değildir):

- **Render.com** → "Web Service" olarak bu `backend/` klasörünü deploy et
- **Railway.app** → aynı şekilde
- Build komutu: `npm install` · Start komutu: `npm start`
- Ortam değişkenlerini (.env içeriğini) hosting panelinden gir

Deploy ettikten sonra sana bir API adresi verecek (örn: `https://toolverse-api.onrender.com`).
Bu adresi frontend'deki her auth sayfasında (`register.html`, `login.html`,
`forgot-password.html`, `reset-password.html`, `verify-notice.html`) şu satırda güncelle:

```js
const API_BASE = 'https://toolverse-api.onrender.com'; // kendi adresini yaz
```

Ayrıca `.env` dosyandaki `FRONTEND_URL` değerinin gerçek Vercel adresinle
(`https://toolverse-tau.vercel.app`) eşleştiğinden emin ol — CORS ve e-posta linkleri buna göre çalışır.

## Uç Noktalar

| Method | Endpoint | Açıklama |
|---|---|---|
| POST | `/api/auth/register` | Yeni kullanıcı kaydı, doğrulama e-postası gönderir |
| GET | `/api/auth/verify-email?token=...` | E-posta doğrulama |
| POST | `/api/auth/login` | Giriş, JWT cookie set eder |
| POST | `/api/auth/logout` | Çıkış, cookie'yi temizler |
| POST | `/api/auth/forgot-password` | Şifre sıfırlama e-postası gönderir |
| POST | `/api/auth/reset-password` | Token ile yeni şifre belirler |
| GET | `/api/auth/me` | Giriş yapmış kullanıcı bilgisi (korumalı) |

## Sırada ne var?
- `users` tablosuna `favorites`, `search_history` tabloları eklenerek kullanıcı paneli genişletilebilir
- Admin paneli için `role` kolonu ve yetkilendirme middleware'i eklenebilir
- Refresh token mekanizması ile daha uzun oturumlar desteklenebilir
