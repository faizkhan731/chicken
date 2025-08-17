// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For authentication (OTP, email/password)
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAlI_w33w3S8DtHlKhMc5gueAK-kVbXPNw",
  authDomain: "chicken-c382d.firebaseapp.com",
  projectId: "chicken-c382d",
  storageBucket: "chicken-c382d.firebasestorage.app",
  messagingSenderId: "783537145675",
  appId: "1:783537145675:web:54b9564ec32bfc37960ace",
  measurementId: "G-M5X9NHJNBV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;
