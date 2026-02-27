// store/onboardingActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase/firebase";
import { getDoc } from "firebase/firestore";

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

      // ✅ Get full name from Firestore "users"
      const userDocRef = doc(db, "users", `${user.email}_${user.uid}`);
      const userSnap = await getDoc(userDocRef);

      const fullName = userSnap.exists()
        ? userSnap.data().fullName
        : "";

      const interestsRaw = await AsyncStorage.getItem(
        `USER_INTERESTS_${user.uid}`
      );

      const interests = interestsRaw
        ? JSON.parse(interestsRaw)
        : [];

      await setDoc(
        doc(db, "usersList", user.uid),
        {
          name: fullName, // ✅ now guaranteed
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