// store/onboardingActions.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase/firebase";

export const goHomeHandler = createAsyncThunk(
  "onboarding/goHomeHandler",
  async ({ photos, region, address }, thunkAPI) => {
    try {
      const preferences =
        thunkAPI.getState().preferencesStore.selectedPreferences;

      const user = getAuth().currentUser;
      if (!user) throw new Error("User not logged in");

      const parentDocId = `${user.email
        .trim()
        .replace(/\s+/g, "_")}_${user.uid}`;

      // ✅ Use collection properly
      const profileCollection = collection(
        db,
        "users",
        parentDocId,
        "profileData"
      );

      const profileRef = doc(profileCollection, "profile");

      const interests =
        JSON.parse(
          await AsyncStorage.getItem(`USER_INTERESTS_${user.uid}`)
        ) || [];

      await setDoc(
        profileRef,
        {
          preferences,
          interests,
          photos,
          location: { region, address },
          onboardingComplete: true,
          updatedAt: serverTimestamp(),
           onboardingComplete: true,
        },
        { merge: true }
      );

      return { success: true };
    } catch (error) {
      console.log("ONBOARDING ERROR:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const goHomesliceHandler = createSlice({
  name: "onboarding",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(goHomeHandler.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(goHomeHandler.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(goHomeHandler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default goHomesliceHandler.reducer;