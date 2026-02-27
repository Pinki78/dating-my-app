import { initializeApp, getApps, getApp } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBnmYtJRotzc7FYtwag0q-Iigpb5nYU2OE",
  authDomain: "my-dating-app-project-2.firebaseapp.com",
  projectId: "my-dating-app-project-2",
  storageBucket: "my-dating-app-project-2.appspot.com",
  messagingSenderId: "228503549492",
  appId: "1:228503549492:web:1571dbaa78ed135080bc61",
};

/* ---------- App ---------- */
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

/* ---------- Auth (SAFE INIT) ---------- */
let auth;

try {
  auth = getAuth(app);
} catch (e) {
  auth = initializeAuth(app, {
   persistence: getReactNativePersistence(AsyncStorage),

  });
}

/* ---------- Firestore ---------- */
const db = getFirestore(app);

export { app, auth, db };
export default app;
