import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import GetStartedIndex from './get-started';
import LogInIndex from './log-in';
import SignInIndex from './sign-in';


export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
          <Stack.Navigator >
              <Stack.Screen
              name="GetStartedIndex"
              component={GetStartedIndex}
              options={{ headerShown: false }}
              />

              <Stack.Screen
              name="log-in"
              component={LogInIndex}
              options={{ headerShown: false }}
              />

              <Stack.Screen
              name="sign-in"
              component={SignInIndex}
              options={{ headerShown: false }}
              />




          </Stack.Navigator >
      </NavigationContainer>
    </>
  );
}


