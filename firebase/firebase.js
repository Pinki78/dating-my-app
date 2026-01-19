import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
  apiKey: "AIzaSyBnmYtJRotzc7FYtwag0q-Iigpb5nYU2OE",
  authDomain: "my-dating-app-project-2.firebaseapp.com",
  projectId: "my-dating-app-project-2",
  storageBucket: "my-dating-app-project-2.appspot.com",
  messagingSenderId: "228503549492",
  appId: "1:228503549492:web:1571dbaa78ed135080bc61"
};

// Initialize app only once
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize auth only once with persistence
const auth = getApps().length
  ? getAuth(app)
  : initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });

// Firestore
const db = getFirestore(app);

export { app, auth, db };
export default app;
