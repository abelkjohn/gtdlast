// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwGoqbgFyCfQmY-IgA2Pdg8mdplcs0dWI",
  authDomain: "getting-things.firebaseapp.com",
  projectId: "getting-things",
  storageBucket: "getting-things.appspot.com",
  messagingSenderId: "1040155822374",
  appId: "1:1040155822374:web:4051619107ddce8934d9e7",
  databaseURL: `https://getting-things-default-rtdb.asia-southeast1.firebasedatabase.app/`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);