-- ============================================================
-- ToolVerse — Auth veritabanı şeması (PostgreSQL)
-- Çalıştırmak için: psql $DATABASE_URL -f db/schema.sql
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
    id                              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email                           TEXT NOT NULL UNIQUE,
    password_hash                   TEXT NOT NULL,
    is_verified                     BOOLEAN NOT NULL DEFAULT FALSE,

    -- E-posta doğrulama için: token'ın kendisi DEĞİL, SHA-256 hash'i saklanır
    email_verification_token_hash  TEXT,
    email_verification_expires     TIMESTAMPTZ,

    -- Şifre sıfırlama için: aynı şekilde hash'lenmiş token saklanır
    password_reset_token_hash      TEXT,
    password_reset_expires         TIMESTAMPTZ,

    created_at                     TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at                     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Hızlı e-posta aramaları için (login, forgot-password)
CREATE INDEX IF NOT EXISTS idx_users_email ON users (LOWER(email));

-- Token doğrulama sorgularını hızlandırmak için
CREATE INDEX IF NOT EXISTS idx_users_email_verif_token ON users (email_verification_token_hash);
CREATE INDEX IF NOT EXISTS idx_users_pw_reset_token ON users (password_reset_token_hash);

-- updated_at otomatik güncellensin
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_users_updated_at ON users;
CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();
