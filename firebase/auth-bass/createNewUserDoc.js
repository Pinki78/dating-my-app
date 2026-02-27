import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export const createNewUserDoc = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  await setDoc(doc(db, "user", user.uid), {
    email: user.email,
    hasPreferences: false, // ⚡ Important for onboarding
    createdAt: serverTimestamp(),
  });
};
