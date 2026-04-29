import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUa3wmEh87fI4jS7GrMw4F_XFgS_7rL08",
  authDomain: "pizza-heaven-400ab.firebaseapp.com",
  projectId: "pizza-heaven-400ab",
  storageBucket: "pizza-heaven-400ab.firebasestorage.app",
  messagingSenderId: "308101036711",
  appId: "1:308101036711:web:700487095d112cfd3df982"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
