import { StyleSheet, Text, View } from 'react-native'
// import ImageCarousel from "./home-commpant/swipe-side";
import { SafeAreaView, SafeAreaProvider, } from 'react-native-safe-area-context'
import { useLayoutEffect, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// PreferListIndex

const HomeIndex = () => {

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: '',
      animation: 'fade',
    });
  }, [navigation]);


  return (
    <>

      {/* <SafeAreaView>
 <ImageCarousel />
      <ScrollView>

        
         
      </ScrollView>

    </SafeAreaView> */}

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