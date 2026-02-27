import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../firebase/firebase";








const MAX_PHOTOS = 6;

const photosSlice = createSlice({
  name: "photosCreate",
  initialState: {
    photoListSelector: [],
  },
  reducers: {
    addPhoto: (state, action) => {
      // if (state.photoListSelector.length < 6) {
      //   state.photoListSelector.push(action.payload);
      // }
      const { uri, index } = action.payload;
      state.photoListSelector[index] = uri; // ✅ replace at index
    },
    removePhoto: (state, action) => {
      // state.photoListSelector.splice(action.payload, 1);
       state.photoListSelector[action.payload] = null;
    },
    clearPhotos: (state) => {
      // state.photoListSelector = [];
       state.photoListSelector = Array(MAX_PHOTOS).fill(null);
    },
  },
});

export const { addPhoto, removePhoto, clearPhotos } = photosSlice.actions;
export default photosSlice.reducer;
