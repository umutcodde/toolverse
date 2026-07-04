# ToolVerse Deployment Adımları

## 🚀 Hızlı Başlangıç

### 1️⃣ Frontend (Vercel) - ÖNCELİKLİ OLARAK YAPILDI

✅ **Zaten yapıldı:**
- GitHub'a push edildi
- Vercel otomatik olarak deploy edecek

```bash
# Vercel otomatik deploy edecek
# https://toolverse-tau.vercel.app
```

---

### 2️⃣ Backend (Render) - Şimdi Yapılacak

**Render.com'a Deploy:**

1. https://render.com'a git
2. "New +" → "Web Service"
3. GitHub repo seç: `umutcodde/toolverse`
4. Ayarla:
   - **Name:** `toolverse-api`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

5. Environment Variables ekle:
```bash
DATABASE_URL=postgresql://user:pass@host/toolverse
JWT_SECRET=your_secret_key_here
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=your_email@resend.com
SMTP_PASSWORD=your_api_key
FRONTEND_URL=https://toolverse-tau.vercel.app
PORT=4000
NODE_ENV=production
```

6. Deploy et

---

### 3️⃣ Database (Neon PostgreSQL)

**Neon.tech'e Kaydol:**

1. https://neon.tech'e git
2. Hesap oluştur (GitHub ile login yapabilirsin)
3. Yeni Project: `toolverse`
4. SQL Editor'a git ve şu komutu çalıştır:

```sql
-- backend/db/init.sql dosyasındaki tüm kodu kopyala ve çalıştır
```

5. Connection String'i kopyala:
```
postgresql://user:password@ep-xxxx.us-east-1.neon.tech/toolverse
```

6. Bunu Render'in DATABASE_URL'ine yapıştır

---

### 4️⃣ Email (Resend)

**Resend.com'e Kaydol:**

1. https://resend.com'a git
2. Hesap oluştur
3. API Keys bölümüne git
4. API Key oluştur
5. Bunu Render'in `SMTP_PASSWORD`'ine yapıştır

---

### 5️⃣ Vercel'e Backend URL Ekle

1. Vercel Dashboard'a git
2. Project: `toolverse`
3. Settings → Environment Variables
4. Yeni Variable ekle:
   - **Name:** `REACT_APP_API_URL`
   - **Value:** `https://toolverse-api.onrender.com` (Render'den aldığın URL)
5. Save ve redeploy

---

## 📋 Deployment Checklist

- [ ] Frontend Vercel'de canlı
- [ ] Backend Render'de deploy edildi
- [ ] Database Neon'da oluşturdu
- [ ] SQL schema çalıştırıldı
- [ ] Environment variables ayarlandı
- [ ] Email servisi (Resend) kuruldu
- [ ] FRONTEND_URL doğru
- [ ] REACT_APP_API_URL doğru

---

## 🔗 Final URLs

```
Frontend:  https://toolverse-tau.vercel.app
Backend:   https://toolverse-api.onrender.com
Database:  neon.tech (PostgreSQL)
Emails:    resend.com
```

---

## ❌ Sorun Giderme

### "CORS hatası alıyorum"
→ Backend .env'de `FRONTEND_URL` doğru mu kontrol et

### "Email gönderilmiyor"
→ SMTP bilgileri (SMTP_HOST, SMTP_USER, SMTP_PASSWORD) doğru mu kontrol et

### "Database bağlantısı başarısız"
→ DATABASE_URL'i Neon'dan kopyala ve Environment Variable'a yapıştır

### "Login yapamıyorum"
→ `/api/auth/me` endpoint'ine istek yap (dev tools > Network)

---

## 📞 Destek

Herhangi sorun olursa:
1. Browser Console'u aç (F12)
2. Network tab'ına bak
3. API çağrılarını kontrol et
4. Error mesajını not et
