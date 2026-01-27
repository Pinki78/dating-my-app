import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export const fetchProfilesFromFirebase = async () => {
  try {
    const snap = await getDocs(collection(db, "profiles"))

    console.log("🔥 Firestore profiles count:", snap.size)

    return snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("❌ Firebase fetch error:", error)
    throw error
  }
}
