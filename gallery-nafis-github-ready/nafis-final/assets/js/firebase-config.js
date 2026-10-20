// پیکربندی Firebase — پروژه Gallery Nafis
export const firebaseConfig = {
  apiKey: "AIzaSyCRLsubGhBXpMKKmZFCbeHI0WjAD5Q9eUc",
  authDomain: "gallery-nafis.firebaseapp.com",
  projectId: "gallery-nafis",
  storageBucket: "gallery-nafis.firebasestorage.app",
  messagingSenderId: "736352543819",
  appId: "1:736352543819:web:b5487fc9d23121982019ce",
  measurementId: "G-27XL2254Y5"
};
export const ADMIN_EMAIL = "darabinafise@gmail.com";
export const isFirebaseConfigured = () => !Object.values(firebaseConfig).some(v => String(v).includes("YOUR_"));
