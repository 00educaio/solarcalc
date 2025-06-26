// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqCePayQeTtUqvCM2MpSGhuovT-t8AW3s",
  authDomain: "solarcalc-e47a5.firebaseapp.com",
  projectId: "solarcalc-e47a5",
  storageBucket: "solarcalc-e47a5.firebasestorage.app",
  messagingSenderId: "781994104944",
  appId: "1:781994104944:web:019426d4afc18d03cffcb5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage) });

export { auth };