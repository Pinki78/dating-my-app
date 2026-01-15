import { useFonts } from "expo-font";
import { Ionicons } from '@expo/vector-icons';
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

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

// import { SafeAreaProvider ,useSafeAreaInsets } from 'react-native-safe-area-context'

import { Provider } from 'react-redux';
import { store } from "./react-redux-store/store.js";

import { useState, useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';



import GetStartedIndex from './get-started';
import LogInIndex from './log-in';
import LookingForIndex from "./looking-for";
import ForGotPasswordindex from "./forgot-password";
import CreatingNewUsersIndex from "./creating-new-users";


export default function App() {
  const Stack = createNativeStackNavigator();
  // const insets = useSafeAreaInsets();
  // 🔹 All hooks FIRST
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


    //  Inter_400Regular: require('./assets/fonts/Inter-Regular.ttf'),
    // Inter_500Medium: require('./assets/fonts/Inter-Medium.ttf'),
    // Inter_600SemiBold: require('./assets/fonts/Inter-SemiBold.ttf'),
    // Inter_700Bold: require('./assets/fonts/Inter-Bold.ttf'),
    // Urbanist_400Regular: require('./assets/fonts/Urbanist-Regular.ttf'),
    // Urbanist_500Medium: require('./assets/fonts/Urbanist-Medium.ttf'),
    // Urbanist_600SemiBold: require('./assets/fonts/Urbanist-SemiBold.ttf'),
    // Urbanist_700Bold: require('./assets/fonts/Urbanist-Bold.ttf'),
    // Mulish_400Regular: require('./assets/fonts/Mulish-Regular.ttf'),
    // Mulish_500Medium: require('./assets/fonts/Mulish-Medium.ttf'),
    // Mulish_600SemiBold: require('./assets/fonts/Mulish-SemiBold.ttf'),
    // Mulish_700Bold: require('./assets/fonts/Mulish-Bold.ttf'),
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

  // 🔹 Only now we can return conditionally
  if (!fontsLoaded || loading) {
    return null; // or splash/loading UI
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>

          {user ? (
            <Stack.Screen name="looking-for" component={LookingForIndex} options={{ headerShown: false }} />
          ) : (
            <>
              <Stack.Screen name="GetStartedIndex" component={GetStartedIndex} options={{ headerShown: false }} />
              <Stack.Screen name="log-in" component={LogInIndex} options={{ headerShown: false }} />
              {/* <Stack.Screen name="sign-in" component={SignInIndex} options={{ headerShown: false }} /> */}
              <Stack.Screen
                name="forgot-password"
                component={ForGotPasswordindex}
                options={({ navigation }) => ({
                  title: '',
                  headerShadowVisible: false,
                  headerTransparent: true,
                  headerStyle: { backgroundColor: 'transparent' },
                  headerLeft: () => (
                    <Ionicons
                      name="arrow-back-circle-outline"
                      size={28}
                      color="#000"
                      style={{ marginLeft: 15 }}
                      onPress={() => navigation.navigate('log-in')}
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="creating-new-users"
                component={CreatingNewUsersIndex}
                options={({ navigation }) => ({
                  title: '',
                  headerShadowVisible: false,
                  headerTransparent: true,
                  headerStyle: { backgroundColor: 'transparent' },

                  headerLeft: () => (
                    <Ionicons
                      name="arrow-back-circle-outline"
                      size={28}
                      color="#000"
                      style={{ marginLeft: 15 }}

                      onPress={() => navigation.navigate('log-in')}
                    />
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
