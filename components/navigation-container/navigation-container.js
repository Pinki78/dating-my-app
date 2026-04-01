import { useFonts } from "expo-font";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import {
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
} from "@expo-google-fonts/urbanist";

import {
  Mulish_400Regular,
  Mulish_500Medium,
  Mulish_600SemiBold,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";

import { useEffect, useState, useRef } from "react";
import { View, ActivityIndicator, Text } from "react-native";


import {
  NavigationContainer,
  useNavigationState,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";

// import GetStartedIndex from "../../get-started";
// import LogInIndex from "../../log-in";
// import CreatingNewUsersIndex from "../../creating-new-users";
// import PreferListIndex from "../../prefer-list";
// import YourInterestsIndex from "../../your-interests";

// import LocationIndex from "../../location";
// import UploadPhotoScreen from "../../upload-your-photo";

// import Footer from "../footer/footer";
// import AboutIndex from "../../about";
// import Header from "../header/header";
// import HomeIndex from "../../home";

import AppNavigator from "./app-navigator";
import AuthStackApp from "./auth-stack-app";
import { setIsAuthenticated } from "../../react-redux-store/store-comp/goHomesliceHandler";

import { useDispatch , useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const NavigationContainerStack = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
    Mulish_400Regular,
    Mulish_500Medium,
    Mulish_600SemiBold,
    Mulish_700Bold,
  });

 const dispatch = useDispatch();

 
  // const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { isAuthenticated, loading } = useSelector(
    (state) => state.goHomesliceHandlerStore
  );
 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (!user) {
      dispatch(setIsAuthenticated(false));
      return;
    }
    
    const docId = `${user.email}_${user.uid}`;
    const userRef = doc(db, "usersList", docId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      dispatch(setIsAuthenticated(false));
      return;
    }

    const userData = userSnap.data();
    const photos = userData?.photos || [];
    const hasPhotos = photos.some((p) => p);

    dispatch(setIsAuthenticated(hasPhotos));
  });

  return unsubscribe;
}, [dispatch]);

if (!fontsLoaded || isAuthenticated === null) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}



  return (
  <NavigationContainer>
    {isAuthenticated ? <AppNavigator /> : <AuthStackApp />}
  </NavigationContainer>
);

};

export default NavigationContainerStack;