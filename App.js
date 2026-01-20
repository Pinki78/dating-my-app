import { useEffect, useState } from "react";
import { View, ActivityIndicator, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Provider } from "react-redux";

import { auth, db } from "./firebase/firebase";
import { store } from "./react-redux-store/store";

import GetStartedIndex from "./get-started";
import LogInIndex from "./log-in";
import CreatingNewUsersIndex from "./creating-new-users";
import PreferListIndex from "./home/home-commpant/prefer-list";
import HomeIndex from "./home";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [hasPreferences, setHasPreferences] = useState(null);
  const [loading, setLoading] = useState(true);

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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            hasPreferences === false ? (
              <Stack.Screen name="prefer-list" component={PreferListIndex} />
            ) : (
              <Stack.Screen name="home" component={HomeIndex} />
            )
          ) : (
            <>
              <Stack.Screen name="GetStartedIndex" component={GetStartedIndex} />
              <Stack.Screen name="log-in" component={LogInIndex} />
              <Stack.Screen
                name="creating-new-users"
                component={CreatingNewUsersIndex}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
