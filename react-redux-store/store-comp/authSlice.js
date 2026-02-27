import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading:false,
show:false,
showPassword:false,
openSelect:null
 
};

const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setShow(state, action) {
      state.show = action.payload;
    },

     setOpenSelect(state, action) {
      state.openSelect = action.payload;
    },

     setShowPassword(state, action) {
      state.showPassword = action.payload;
    },
   
    logout(state) {
      state.user = null;
      state.hasPreferences = false;
    },
  },
});

export const {
  
  setLoading,
  setShow, // ⚡ export it
  logout,
  setOpenSelect,
  setShowPassword

} = authSlice.actions;

export default authSlice.reducer;