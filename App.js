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

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

import { Provider } from 'react-redux';
import { store } from "./react-redux-store/store.js";

import { useState, useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer,  } from '@react-navigation/native';
import { ActivityIndicator, View } from "react-native";


import HomeIndex from './home';
import GetStartedIndex from './get-started';
import LogInIndex from './log-in';
import PreferListIndex from "./home/home-commpant/prefer-list/index.js";
import ForGotPasswordindex from "./forgot-password";
import CreatingNewUsersIndex from "./creating-new-users";
import UploadPhotoScreen from "./upload-your-photo/index.js";


const Stack = createNativeStackNavigator();

export default function App() {

  // const navigation = useNavigation();

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

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  if (!fontsLoaded || loading) {
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
           <>
            <Stack.Screen name="prefer-list" component={PreferListIndex}  options={{ headerShown: false }}/>
         
             {/* <Stack.Screen
              name="UploadPhoto"
              component={UploadPhotoScreen}
              options={{ headerShown: false }}
            /> */}
            <Stack.Screen name="home" component={HomeIndex} options={{ headerShown: false }} />
           </>
          ) : (
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
