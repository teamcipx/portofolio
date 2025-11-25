
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB4R7eXPcmYA2X9Y9fEMYrQaPQbcQaiASs",
  authDomain: "fir-webux-843ff.firebaseapp.com",
  projectId: "fir-webux-843ff",
  storageBucket: "fir-webux-843ff.firebasestorage.app",
  messagingSenderId: "420612957964",
  appId: "1:420612957964:web:15257f8cb509d0a64b0b29"
};

// Initialize Firebase (check for existing apps to prevent re-initialization)
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

// Export services
export const auth = firebase.auth();
export const db = firebase.firestore();

// Fix for "Backend didn't respond within 10 seconds" error.
// This forces Firestore to use Long Polling instead of WebSockets, which resolves most connectivity issues.
db.settings({ experimentalForceLongPolling: true });

export const googleProvider = new firebase.auth.GoogleAuthProvider();
// Ensure account selection prompt appears every time
googleProvider.setCustomParameters({ prompt: 'select_account' });

export default app;