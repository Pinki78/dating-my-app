import { configureStore } from "@reduxjs/toolkit";
import profilesReducer from "./store-comp/uploadProfiles";

export const store = configureStore({
  reducer: {
    profilesApi: profilesReducer,
  },
});