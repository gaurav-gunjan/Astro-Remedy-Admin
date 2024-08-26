// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyC0rnIRFFLXoqdv84HWuLZzMJuxvpSJRM4",
  authDomain: "logo.firebaseapp.com",
  databaseURL: "https://logo-default-rtdb.firebaseio.com",
  projectId: "logo",
  storageBucket: "logo.appspot.com",
  messagingSenderId: "494915822458",
  appId: "1:494915822458:web:a43ef914dcae9f233bacc3",
  measurementId: "G-PD2VN2QSD1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)
export const firestore = getFirestore(app)
const analytics = getAnalytics(app);
