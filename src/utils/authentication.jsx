import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBv-9-A3CWgRBdL5B94WZS8XZ7B9eVYyUk",
  authDomain: "aravind-netflix.firebaseapp.com",
  projectId: "aravind-netflix",
  storageBucket: "aravind-netflix.firebasestorage.app",
  messagingSenderId: "828027917364",
  appId: "1:828027917364:web:5e1a3c1e58a5252b9f2661",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
