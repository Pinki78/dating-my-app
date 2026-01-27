import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { profiles_data } from "../../assets/data/profilesData/profilesData"
import { fetchProfilesFromFirebase } from "../../firebase/auth-bass/profilesService"

// export const loadProfiles = createAsyncThunk(
//   "profiles/loadProfiles",
//   async () => {
//     return await fetchProfilesFromFirebase()
//   }
// )


// export const loadProfiles = createAsyncThunk(
//   "profiles/loadProfiles",
//   async () => {
//     const firebaseData = await fetchProfilesFromFirebase()

//     // 🔥 fallback to local data
//     if (!firebaseData.length) {
//       console.warn("⚠️ Firebase empty, using local profiles_data")
//       return profiles_data
//     }

//     return firebaseData
//   }
// )

export const loadProfiles = createAsyncThunk(
  "profiles/loadProfiles",
  async () => {
    return await fetchProfilesFromFirebase()
  }
)

const initialState = {
  profilesState: [],
  loading: false,
  error: null,
}

const profilesSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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

export default profilesSlice.reducer