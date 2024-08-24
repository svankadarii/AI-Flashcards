// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh6l58185-EcIKEyXLpKQKBHvBt0MAlgI",
  authDomain: "flashcard-saas-3dc45.firebaseapp.com",
  projectId: "flashcard-saas-3dc45",
  storageBucket: "flashcard-saas-3dc45.appspot.com",
  messagingSenderId: "1057699059045",
  appId: "1:1057699059045:web:b74d344071c8ada19cbd8c",
  measurementId: "G-Y7PDJYW01N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db };
