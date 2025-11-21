
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your actual Firebase Project Config
// You can find this in Firebase Console > Project Settings > General > Your Apps
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY_HERE",
  authDomain: "siam-hasan-portfolio.firebaseapp.com",
  projectId: "siam-hasan-portfolio",
  storageBucket: "siam-hasan-portfolio.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
