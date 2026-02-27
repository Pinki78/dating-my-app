import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
const MAX_PHOTOS = 6;
// export const handleContinue = createAsyncThunk(
//   "photosCreate/handleContinue",
//   async (_, thunkAPI) => {
//     try {
//       const state = thunkAPI.getState();
//       const photos = state.photosStore.photoListSelector;

//       if (!photos.some(Boolean)) {
//         return thunkAPI.rejectWithValue("Upload at least one photo");
//       }

//       const userId = auth.currentUser?.uid;
//       if (!userId) return;

//       const STORAGE_KEY = `USER_PHOTOS_${userId}`;

//       await AsyncStorage.setItem(
//         STORAGE_KEY,
//         JSON.stringify(photoListSelector)
//       );

//       navigation.navigate("location");
//     } catch (error) {
//       console.log("Save error:", error);
//     }
//   }
// )


export const pickImageThunk = createAsyncThunk(
  "photosCreate/pickImage",
  async (index, thunkAPI) => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        throw new Error("Permission denied");
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled) {
        return {
          uri: result.assets[0].uri,
          index,
        };
      }

      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const photosSlice = createSlice({
  name: "photosCreate",
  initialState: {
    photoListSelector: Array(MAX_PHOTOS).fill(null), // ✅ FIXED
    loading: false,
  },
  reducers: {
    // addPhoto: (state, action) => {
    //   const { uri, index } = action.payload;
    //   state.photoListSelector[index] = uri; // ✅ replace at index
    // },
    removePhoto: (state, action) => {
      state.photoListSelector[action.payload] = null;
    },
    clearPhotos: (state) => {
      state.photoListSelector = Array(MAX_PHOTOS).fill(null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(pickImageThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(pickImageThunk.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload) {
          const { uri, index } = action.payload;
          state.photoListSelector[index] = uri; // ✅ UPDATE STATE HERE
        }
      })
      .addCase(pickImageThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { removePhoto, clearPhotos, 
  // addPhoto 
} = photosSlice.actions;
export default photosSlice.reducer;