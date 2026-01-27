import { collection, doc, setDoc } from "firebase/firestore"
import { db } from "../firebase";
import { profiles_data } from "../../assets/data/profilesData/profilesData";

const cleanProfileForFirebase = (profile) => {
  return {
    title: profile.title,
    age: profile.age,
    gender: profile.gender,
    profesional: profile.profesional,
    location: profile.location,
    description: profile.description,
    PreferencesType: profile.PreferencesType,
    totalConins: profile.totalConins,

    ProInterests: profile.ProInterests.map(i => ({
      id: i.id,
      name: i.name,
      icon: i.icon,
    })),

    ProGallery: profile.ProGallery.map(g => ({
      id: g.id,
      name: g.name,
    })),

    image: profile.image, // 👈 store string path only
  }
}

export const seedProfilesToFirebase = async () => {
  const colRef = collection(db, "profiles")

  for (const profile of profiles_data) {
    await setDoc(
      doc(colRef, profile.id),
      cleanProfileForFirebase(profile)
    )
  }

  console.log("✅ Profiles seeded successfully")
}
