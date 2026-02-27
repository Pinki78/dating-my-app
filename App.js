// import { useFonts } from "expo-font";
// import { Ionicons } from '@expo/vector-icons';
// import {
//   Inter_400Regular,
//   Inter_500Medium,
//   Inter_600SemiBold,
//   Inter_700Bold,
// } from "@expo-google-fonts/inter";

// import {
//   Urbanist_400Regular,
//   Urbanist_500Medium,
//   Urbanist_600SemiBold,
//   Urbanist_700Bold,
// } from "@expo-google-fonts/urbanist";

// import {
//   Mulish_400Regular,
//   Mulish_500Medium,
//   Mulish_600SemiBold,
//   Mulish_700Bold,
// } from "@expo-google-fonts/mulish";


// import { useEffect, useState } from "react";
// import { View, ActivityIndicator, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
import { Provider } from "react-redux";

// import { seedProfilesToFirebase } from "./firebase/auth-bass/seedProfiles"
// import { auth, db } from "./firebase/firzebase";
import { store } from "./react-redux-store/store";


// import GetStartedIndex from "./get-started";
// import LogInIndex from "./log-in";
// import CreatingNewUsersIndex from "./creating-new-users";
// import PreferListIndex from "./home/home-commpant/prefer-list";
// import HomeIndex from "./home";

const Stack = createNativeStackNavigator();



import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigationContainerStack from "./components/navigation-container/navigation-container";

export default function App() {



//   useEffect(() => {
//     const clearOnReload = async () => {
//       await AsyncStorage.clear(); // ⚠ DEV / testing only
//       console.log("App storage cleared on reload");
//     };

//     clearOnReload();
//   }, []);



// useEffect(() => {
//   seedProfilesToFirebase()
// }, [])

// const [fontsLoaded] = useFonts({
//     Inter_400Regular,
//     Inter_500Medium,
//     Inter_600SemiBold,
//     Inter_700Bold,
//     Urbanist_400Regular,
//     Urbanist_500Medium,
//     Urbanist_600SemiBold,
//     Urbanist_700Bold,
//     Mulish_400Regular,
//     Mulish_500Medium,
//     Mulish_600SemiBold,
//     Mulish_700Bold,
//   });


//   const [user, setUser] = useState(null);
//   const [hasPreferences, setHasPreferences] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, async (u) => {
//       if (u) {
//         const snap = await getDoc(doc(db, "user", u.uid));
//         setHasPreferences(snap.data()?.hasPreferences ?? false);
//         setUser(u);
//       } else {
//         setUser(null);
//         setHasPreferences(null);
//       }
//       setLoading(false);
//     });

//     return unsub;
//   }, []);

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  
  // if (!fontsLoaded || loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }


  return (
    <Provider store={store}>
      <NavigationContainerStack />
  
    </Provider>
  );
}
