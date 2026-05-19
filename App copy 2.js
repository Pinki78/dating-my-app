import { useFonts } from "expo-font";
import { Ionicons } from '@expo/vector-icons';
import {Feather , SimpleLineIcons} from 'react-native-vector-icons';
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

import { Pressable } from 'react-native'

import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
// import { Provider, useDispatch } from "react-redux";

import { auth, db } from "./firebase/firebase";
import { store } from "./react-redux-store/store";
// import { loadProfiles } from "./react-redux-store/store-comp/uploadProfiles";

import { Provider , useDispatch} from 'react-redux';


import HomeIndex from '../Dating-App/home/index.js';
import GetStartedIndex from '../Dating-App/get-started/index.js';
import LogInIndex from '../Dating-App/log-in/index.js';
import PreferListIndex from "../Dating-App/home/home-commpant/prefer-list/index.js";
import ForGotPasswordindex from "../Dating-App/forgot-password/index.js";
import CreatingNewUsersIndex from "../Dating-App/creating-new-users/index.js";
import UploadPhotoScreen from "../Dating-App/upload-your-photo/index.js";

const Stack = createNativeStackNavigator();

/* ✅ THIS COMPONENT CAN USE REDUX */
export default function App() {

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


  // const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [hasPreferences, setHasPreferences] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Load profiles from Firebase → Redux
  // useEffect(() => {
  //   dispatch(loadProfiles());
  // }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        const snap = await getDoc(doc(db, "user", u.uid));
        setHasPreferences(snap.data()?.hasPreferences ?? false);
        setUser(u);
      } else {
        setUser(null);
        setHasPreferences(null);
      }
      setLoading(false);
    });

    return unsub;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator >
          
          {user ? (
            hasPreferences === false ?  (
              <Stack.Screen name="home" component={HomeIndex} />
            ) : (
              <Stack.Screen name="prefer-list" component={PreferListIndex} />
            )
          )  : (
            <>
              <Stack.Screen name="GetStartedIndex" component={GetStartedIndex}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="log-in" component={LogInIndex} options={{ headerShown: false }} />
              <Stack.Screen name="forgot-password"
                component={ForGotPasswordindex}
                  options={({ navigation }) => ({
                    headerShown: true,
                    headerBackVisible: false,
                    title: "",
                    headerLeft: () => (
                      <Pressable onPress={() => navigation.goBack('log-in')}>
                        <Ionicons name="arrow-back-circle-outline" size={24} color="#000" />
                      </Pressable>
                    ),
                  })}
              />
              <Stack.Screen name="creating-new-users" component={CreatingNewUsersIndex}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerBackVisible: false,
                    title: "",
                    headerLeft: () => (
                      <Pressable onPress={() => navigation.goBack('log-in')}>
                        <Ionicons name="arrow-back-circle-outline" size={24} color="#000" />
                      </Pressable>
                    ),
                  })}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
