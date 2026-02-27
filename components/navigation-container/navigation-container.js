
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


import { useEffect, useState } from "react";

import { View, ActivityIndicator, Pressable } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";

import GetStartedIndex from "../../get-started";
import LogInIndex from "../../log-in";
import CreatingNewUsersIndex from "../../creating-new-users";
import PreferListIndex from "../../prefer-list";
import YourInterestsIndex from "../../your-interests";
import HomeIndex from "../../home";
import LocationIndex from "../../location";
import UploadPhotoScreen from "../../upload-your-photo";

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






      if (!fontsLoaded  ) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }



  return (
    <>
      <NavigationContainer >
      <Stack.Navigator >

      
        <Stack.Screen name="GetStartedIndex" 
        component={GetStartedIndex} options={{ headerShown: false }}/>

        {/* AUTH */}
        <Stack.Screen name="log-in" component={LogInIndex}  options={{ headerShown: false }}/>
        <Stack.Screen
          name="creating-new-users"
          component={CreatingNewUsersIndex}
          options={{ headerShown: false }}
        />

        {/* ONBOARDING */}
        <Stack.Screen name="prefer-list" component={PreferListIndex} options={{ headerShown: false }}/>
        <Stack.Screen name="your-interests" component={YourInterestsIndex} options={{ headerShown: false }}/>
        <Stack.Screen name="upload-your-photo" component={UploadPhotoScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="location" component={LocationIndex} options={{ headerShown: false }}/>

        {/* APP */}
        <Stack.Screen name="home" component={HomeIndex}  options={{ headerShown: false }}/>

      </Stack.Navigator>
    </NavigationContainer>
    </>
  )
}

export default NavigationContainerStack

// const styles = StyleSheet.create({})