import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export const saveUserPreferences = async (preferences) => {

  const user = auth.currentUser;

  if (!user) throw new Error("User not logged in");

  await setDoc(
    doc(db, "users", user.uid),
    {
      email: user.email,
      preferences,
      hasPreferences: false,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};
