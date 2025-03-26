import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBt0y2hBtOE_fi6mR0TxhQrbclmJ0E",
  authDomain: "shateki.firebaseapp.com",
  databaseURL: "https://shateki-default-rtdb.firebaseio.com",
  projectId: "shateki",
  storageBucket: "shateki.firebasestorage.app",
  messagingSenderId: "850755380630",
  appId: "1:850755380630:web:b63dcae33a95940b1069b7",
  measurementId: "G-W4JG877GJ3"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);