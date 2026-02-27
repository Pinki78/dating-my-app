import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase/firebase";

 // Async thunk to save preferences
// export const savePreferences = createAsyncThunk(
//   "preferences/savePreferences",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const { selectedPreferences } = getState().preferences; // ✅ read from Redux

//       if (!selectedPreferences?.length) {
//         return rejectWithValue("No preferences selected");
//       }

//       const auth = getAuth();
//       const userId = auth.currentUser?.uid;
//       if (!userId) return rejectWithValue("User not logged in");

//       const STORAGE_KEY = `USER_PREFERENCES_${userId}`;

//       console.log("Preferences saved:", selectedPreferences); // ✅ log

//       await setDoc(doc(db, "users", userId), { preferences: selectedPreferences }, { merge: true });
//       await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(selectedPreferences));

//       return selectedPreferences;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const savePreferences = createAsyncThunk(
  "preferences/savePreferences",
  async (_, { getState, rejectWithValue }) => {
    const { selectedPreferences } = getState().preferences;
    console.log("Preferences saved:", selectedPreferences);
    return selectedPreferences;
  }
);


const preferencesSlice = createSlice({
  name: "preferences",
  initialState: {
    selectedPreferences: [],
    showInterests: false,
    showCongrats: false,
    loading: false,
    error: null,
  },
  reducers: {
    setShowInterests: (state, action) => {
      state.showInterests = action.payload;
    },
    setSelectedPreferences: (state, action) => {
      state.selectedPreferences = action.payload;
    },
    toggleSelect: (state, action) => {
  const value = action.payload;
  if (state.selectedPreferences.includes(value)) {
    state.selectedPreferences = state.selectedPreferences.filter(
      (item) => item !== value
    );
  } else {
    state.selectedPreferences.push(value);
  }
  console.log("Selected preferences:", state.selectedPreferences); // ✅ log every toggle
},

    setShowCongrats: (state, action) => {
      state.showCongrats = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
     builder
    .addCase(savePreferences.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(savePreferences.fulfilled, (state) => {
      state.loading = false;
      state.showCongrats = true; // ✅ set it here, not in thunk
    })
    .addCase(savePreferences.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setShowInterests, setSelectedPreferences, toggleSelect, setShowCongrats } =
  preferencesSlice.actions;

export default preferencesSlice.reducer;