import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { profiles_data } from "../../assets/data/profilesData/profilesData"
// import { uploadProfilesFirebase } from "../../firebase/auth-bass/555"
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase";

// 🔹 Upload menu to Firestore
export const uploadProfilesFirebase = createAsyncThunk(
  "profilesDatas/uploadProfiles",
  async () => {
    await setDoc(collection, doc(db,  "profiles", "profileLists"), {
      profilesDatas: profiles_data,
    });

    return profiles_data;
  }
);


// Fetch menu
// export const loadProfiles = createAsyncThunk(
//   "profilesDatas/fetchProfiles",
//   async () => {
//     const docRef = doc(db, "profiles", "profileLists");
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       return docSnap.data().profilesDatas;
//     } else {
//       // fallback if firestore empty
//       return uploadProfilesFirebase;
//     }
//   }
// );


export const loadProfiles = createAsyncThunk(
  "profilesDatas/fetchProfiles",
  async () => {

    const docRef = doc(db, "profiles", "profileLists");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().profilesDatas;
    }

    // Auto upload if empty
    await setDoc(docRef, {
      profilesDatas: profiles_data,
    });

    return profiles_data;
  }
);

// export const loadProfiles = createAsyncThunk(
//   "profiles/loadProfiles",
//   async () => {
//     return await fetchProfilesFromFirebase()
//   }
// )

const initialState = {
  profilesState: [],
  loading: false,
  error: null,
  // showInterests: false,
  // selectedPreferences: []
}

const profilesSlice = createSlice({
  name: "profilesDatas",
  initialState,
  reducers: {

    // setShowInterests: (state, action) => {
    //   state.showInterests = action.payload;
    // },
    // setSelectedPreferences: (state, action) => {
    //   state.selectedPreferences = action.payload;
    // }
  },
   loading: false,
  extraReducers: (builder) => {
    builder

     .addCase(uploadProfilesFirebase.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadProfilesFirebase.fulfilled, (state, action) => {
        state.profilesState = action.payload;
        state.loading = false;
      })
      .addCase(loadProfiles.pending, (state) => {
        state.loading = true
      })
      .addCase(loadProfiles.fulfilled, (state, action) => {
        state.loading = false
        state.profilesState = action.payload
      })
      .addCase(loadProfiles.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})


export const { setShowInterests,setSelectedPreferences } = profilesSlice.actions;
export default profilesSlice.reducer