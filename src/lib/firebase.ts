import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "dummy",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dummy",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dummy",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dummy",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "dummy",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "dummy"
};

// Initialize Firebase only if the API key is actually provided (not dummy)
let app = null;
let db = null;

try {
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "dummy") {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
} catch (e) {
  console.error("Erreur lors de l'initialisation de Firebase", e);
}

export { app, db };
