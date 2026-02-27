import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../firebase/firebase";

export const saveInterests = createAsyncThunk(
  "interests/saveInterests",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const selectedInterests = state.interestsStore.selectedInterests;

      if (!selectedInterests.length) return;

      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const STORAGE_KEY = `USER_INTERESTS_${userId}`;

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(selectedInterests)
      );

      return true;
    } catch (error) {
      console.log("Save error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const interestsSlice = createSlice({
  name: "interests",
  initialState: {
    selectedInterests: [],
    showUploadPhoto: false,
  },
  reducers: {

    setSelectedInterests: (state, action) => {
      state.selectedInterests = action.payload;
    },

    setShowUploadPhoto: (state, action) => {
      state.showUploadPhoto = action.payload;
    },

    toggleInterest: (state, action) => {
      const id = action.payload;
      if (state.selectedInterests.includes(id)) {
        state.selectedInterests = state.selectedInterests.filter(x => x !== id);
      } else {
        state.selectedInterests.push(id);
      }
    },
    clearInterests: (state) => {
      state.selectedInterests = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(saveInterests.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveInterests.fulfilled, (state) => {
        state.loading = false;
        state.showUploadPhoto = true; // ✅ move here instead
        
      })
      .addCase(saveInterests.rejected, (state) => {
        state.loading = false;
      });
  },
});


export const {
  setSelectedInterests,
  toggleInterest,
  setShowUploadPhoto,
  clearInterests,
} = interestsSlice.actions;

export default interestsSlice.reducer;
