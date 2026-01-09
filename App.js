import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import GetStartedIndex from './get-started';

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
          </Stack.Navigator >
      </NavigationContainer>
    </>
  );
}


