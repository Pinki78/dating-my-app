// store/onboardingActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, setDoc, getDoc  } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase/firebase";

export const goHomeHandler = createAsyncThunk(
  "onboarding/goHomeHandler",
  async ({ photos, region, address }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const preferences =
        state.preferencesStore.selectedPreferences;

      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) throw new Error("User not logged in");

      // ✅ Now user is available
      const interestsRaw = await AsyncStorage.getItem(
        `USER_INTERESTS_${user.uid}`
      );

      const interests = interestsRaw
        ? JSON.parse(interestsRaw)
        : [];

      const docId = user.uid;

      await setDoc(
        doc(db, "usersList", docId),
        {
         name: user.displayName || "",
          email: user.email || "",
          preferences,
          interests,
          photos,
          location: { region, address },
          onboardingComplete: true,
        },
        { merge: true }
      );

      return true;
    } catch (error) {
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
                state.error = null;
            })
            .addCase(goHomeHandler.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default goHomesliceHandler.reducer;