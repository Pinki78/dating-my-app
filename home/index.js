import { StyleSheet, Text, View } from 'react-native'
// import ImageCarousel from "./home-commpant/swipe-side";
import { SafeAreaView, SafeAreaProvider, } from 'react-native-safe-area-context'
import { useLayoutEffect, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
// PreferListIndex

// import { persistor } from '../react-redux-store/store';

import { signOut } from "firebase/auth";
import { auth } from '../firebase/firebase';


const HomeIndex = () => {

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: '',
      animation: 'fade',
    });
  }, [navigation]);


  const dispatch = useDispatch();




const logoutHandler = async () => {
  try {
    await signOut(auth);
  
    navigation.replace("log-in"); // go to login screen
  } catch (error) {
    console.log(error);
  }
};


  return (
    <>

      <SafeAreaView style={styles.container}>

    <Text>pinki</Text>

    <Text style={{marginTop:20}}>You are logged in ✅</Text>

    <Text
      onPress={logoutHandler}
      style={{
        marginTop:40,
        backgroundColor:"red",
        color:"#fff",
        padding:12,
        textAlign:"center",
        borderRadius:8,
        fontWeight:"bold"
      }}
    >
      LOG OUT
    </Text>

  </SafeAreaView>

            {/* <PreferListIndex /> */}

   


    </>
  )
}

export default HomeIndex

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdecef",
    paddingHorizontal: 24,
    
  },



});