import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeIndex from "../../home";
// import AboutIndex from "../../about";
import Footer from "../footer/footer";
import Header from "../header/header";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <>
    <Header />
      <Stack.Navigator >
        <Stack.Screen name="home" component={HomeIndex} />
        {/* <Stack.Screen name="about" component={AboutIndex} /> */}
      </Stack.Navigator>

      {/* Footer only inside App */}
      <Footer />
    </>
  );
};

export default AppNavigator;