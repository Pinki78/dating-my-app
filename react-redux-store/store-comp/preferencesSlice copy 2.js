import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ✅ Async Thunk
export const savePreferences = createAsyncThunk(
  "preferences/savePreferences",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { selectedPreferences } =
        getState().preferencesStore; // ✅ correct state path

      if (!selectedPreferences.length) {
        return rejectWithValue("No preferences selected");
      }

      console.log("Preferences saved:", selectedPreferences);

      // 🔥 You can add Firebase saving here later

      return selectedPreferences;
    } catch (error) {
      return rejectWithValue(error.message);
    }
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
        state.selectedPreferences =
          state.selectedPreferences.filter(
            (item) => item !== value
          );
      } else {
        state.selectedPreferences.push(value);
      }

      console.log(
        "Selected preferences:",
        state.selectedPreferences
      );
    },

    setShowCongrats: (state, action) => {
      state.showCongrats = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(savePreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(savePreferences.fulfilled, (state) => {
        state.loading = false;
        state.showCongrats = true; // ✅ show congratulations
      })
      .addCase(savePreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setShowInterests,
  setSelectedPreferences,
  toggleSelect,
  setShowCongrats,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;
