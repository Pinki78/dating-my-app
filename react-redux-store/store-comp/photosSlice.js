import { createSlice } from "@reduxjs/toolkit";

const photosSlice = createSlice({
  name: "photosCreate",
  initialState: {
    list: [],
  },
  reducers: {
    addPhoto: (state, action) => {
      if (state.list.length < 6) {
        state.list.push(action.payload);
      }
    },
    removePhoto: (state, action) => {
      state.list.splice(action.payload, 1);
    },
    clearPhotos: (state) => {
      state.list = [];
    },
  },
});

export const { addPhoto, removePhoto, clearPhotos } = photosSlice.actions;
export default photosSlice.reducer;
