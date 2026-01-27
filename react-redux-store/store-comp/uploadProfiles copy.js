import { createSlice } from "@reduxjs/toolkit";
import { profiles_data } from "../../assets/data/profilesData/profilesData";

const initialState = {
  profilesState: profiles_data,
  loading: false,
  error: null,
};

const profilesSlice = createSlice({
  name: "profilesName",
  initialState,
  reducers: {
    setProfiles(state, action) {
      state.profilesState = action.payload;
    },
    addProfile(state, action) {
      state.profilesState.push(action.payload);
    },
    clearProfiles(state) {
      state.profilesState = [];
    },
  },
});

export const { setProfiles, addProfile, clearProfiles } = profilesSlice.actions;
export default profilesSlice.reducer;

