import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHo5Nmy9iDaBEluO7U5BwM7UKby3_gULU",
  authDomain: "encrypto-60748.firebaseapp.com",
  projectId: "encrypto-60748",
  storageBucket: "encrypto-60748.firebasestorage.app",
  messagingSenderId: "454095486356",
  appId: "1:454095486356:web:7cd1fd76781fef07666381",
  measurementId: "G-7SBDQHS4R2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
