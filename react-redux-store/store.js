import { configureStore } from "@reduxjs/toolkit";
import profilesReducer from "./store-comp/uploadProfiles";
import photosSlice from './store-comp/photosSlice'

export const store = configureStore({
  reducer: {
    profilesApi: profilesReducer,
    photosStore:photosSlice,
  },
});