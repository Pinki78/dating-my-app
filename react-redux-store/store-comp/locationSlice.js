// store/locationSlice.js
import { createSlice } from "@reduxjs/toolkit";

import AsyncStorage from "@react-native-async-storage/async-storage";

const LOCATION_KEY = "USER_LOCATION";
const LOCATION_VERSION = 1;

export const saveLocationToStorage = async (data) => {
  try {
    const payload = {
      version: LOCATION_VERSION,
      data,
    };
    await AsyncStorage.setItem(LOCATION_KEY, JSON.stringify(payload));
  } catch (error) {
    console.error("Save location failed:", error);
  }
};

export const getLocationFromStorage = async () => {
  try {
    const value = await AsyncStorage.getItem(LOCATION_KEY);
    if (!value) return null;

    const parsed = JSON.parse(value);

    if (parsed.version !== LOCATION_VERSION) {
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.error("Get location failed:", error);
    return null;
  }
};

export const clearLocationFromStorage = async () => {
  try {
    await AsyncStorage.removeItem(LOCATION_KEY);
  } catch (error) {
    console.error("Clear location failed:", error);
  }
};

const locationSlice = createSlice({
  name: "locationMap",
  initialState: {
    region: null,
    address: null,
    locationAdded: false,
    showBtn: false,
    editFrom: false,

  },
  reducers: {
    setLocation(state, action) {
      state.region = action.payload.region;
      state.address = action.payload.address;
    },
    clearLocation(state) {
      state.region = null;
      state.address = null;
    },
    setShowBtn: (state, action) => {
      state.showBtn = action.payload;
    },
    setLocationAdded: (state, action) => {
      state.locationAdded = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setEditFrom: (state, action) => {
      state.editFrom = action.payload;
    },
    setRegion: (state, action) => {
      state.region = action.payload;
    },
  },
});

export const { setLocation,
  clearLocation,
  setLocationAdded,
  setAddress,
  setShowBtn, setEditFrom, setRegion } = locationSlice.actions;
export default locationSlice.reducer;
