import { configureStore } from "@reduxjs/toolkit";
import profilesReducer from "./store-comp/uploadProfiles";
import photosSlice from './store-comp/photosSlice'
import locationSlice  from './store-comp/locationSlice'
import authSlice from './store-comp/authSlice'
import interestsSlice from './store-comp/interestsSlice'
import goHomesliceHandler from './store-comp/goHomesliceHandler'
import preferencesSlice from './store-comp/preferencesSlice'

export const store = configureStore({
  reducer: {
    profilesApi: profilesReducer,
    photosStore:photosSlice,
    locationStore:locationSlice,
    authStore:authSlice,
    interestsStore:interestsSlice,
    goHomesliceHandlerStore:goHomesliceHandler,
   preferencesStore:preferencesSlice,
  },
});