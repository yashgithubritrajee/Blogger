// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2TibUWvCDJCxltgOafVcR2_DglGGOhGw",
  authDomain: "blogeb.firebaseapp.com",
  projectId: "blogeb",
  storageBucket: "blogeb.appspot.com",
  messagingSenderId: "995647050062",
  appId: "1:995647050062:web:804b8d0726a7356bcdce1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()
export const auth = getAuth()
export const storage = getStorage()