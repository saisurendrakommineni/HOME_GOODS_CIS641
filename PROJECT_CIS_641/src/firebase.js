import React from 'react';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Import the Realtime Database

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUfmBPE8zyNpu_CvRNcNuqK-9NJFAHQqg",
  authDomain: "home-goods-inventory-system.firebaseapp.com",
  projectId: "home-goods-inventory-system",
  storageBucket: "home-goods-inventory-system.appspot.com",
  messagingSenderId: "832889371836",
  appId: "1:832889371836:web:0835ab013150bc05d964b9",
  measurementId: "G-1HL856XXMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and export it
const auth = getAuth(app); // Create the auth instance
const database = getDatabase(app); // Initialize Realtime Database
export { auth,database }; // Export the auth object for use in other parts of your application