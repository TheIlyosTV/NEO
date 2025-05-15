// firebase.ts (yoki kerakli fayl)
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // To'g'ri import qilish

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwaoDDnBq5W3Zsgxfl3FWVTb4v8QGAkPI",
  authDomain: "neo-ecommerce-a246f.firebaseapp.com",
  projectId: "neo-ecommerce-a246f",
  storageBucket: "neo-ecommerce-a246f.appspot.com",
  messagingSenderId: "1025008716801",
  appId: "1:1025008716801:web:636c378e75a43e8fa68400",
  measurementId: "G-TT18B4P0TG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup }; // signInWithPopup'ni eksport qilish
