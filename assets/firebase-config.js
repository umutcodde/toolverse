// Firebase Configuration - Güncellenmiş Versiyon
// Google Firebase Console'dan config bilgilerinizi kopyalayıp yapıştırınız
// https://console.firebase.google.com/

export const firebaseConfig = {
  apiKey: "AIzaSyBkExample", // Firebase Console'dan al
  authDomain: "toolverse-app.firebaseapp.com",
  projectId: "toolverse-app",
  storageBucket: "toolverse-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefghijk"
};

// NOT: .env.local dosyasına taşınması önerilir
// Frontend URL - Backend API ile iletişim
export const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000';
