import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "../firebase"
import {  createAsyncThunk } from "@reduxjs/toolkit"

// export const fetchProfilesFromFirebase = async () => {
//   try {
//     const snap = await getDocs(collection(db, "profiles", "profileLists"))

//     console.log("🔥 Firestore profiles count:", snap.size)

//     return snap.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data(),
//     }))
//   } catch (error) {
//     console.error("❌ Firebase fetch error:", error)
//     throw error
//   }
// }


// // 🔹 Upload menu to Firestore
// export const uploadProfilesFirebase = createAsyncThunk(
//   "profilesDatas/uploadProfiles",
//   async () => {
//     await setDoc(doc(db,  "profiles", "profileLists"), {
//       profilesDatas: profiles_data,
//     });

//     return profiles_data;
//   }
// );
