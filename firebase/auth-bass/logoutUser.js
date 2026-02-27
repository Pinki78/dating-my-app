import { signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../firebase";

export const logoutUser = async (dispatch, logout) => {
  try {

    // ✅ Firebase logout
    await signOut(auth);

    // ✅ Clear storage (optional — only if you store data)
    await AsyncStorage.clear();

    // ✅ Reset redux
    dispatch(logout());

  } catch (error) {
    console.log("Logout error:", error);
  }
};
