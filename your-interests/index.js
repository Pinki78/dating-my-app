import { StyleSheet, } from "react-native";
import { SafeAreaView, SafeAreaProvider, } from 'react-native-safe-area-context'
import { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from "@react-navigation/native";
import HeaderIocnText from "../components/cutom-header/header-iocn-text";
import CommpantText from "../components/logo-text/commpant-text";
import InterestsList from "./interests-list";
import UploadPhotoScreen from "../upload-your-photo";

import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setShowUploadPhoto, setSelectedInterests } from "../react-redux-store/store-comp/interestsSlice";




const YourInterestsIndex = (props) => {

  const {  handleBackInterests,  } = props;

    const {showUploadPhoto, selectedInterests} = useSelector(
    state => state.interestsStore
  )
   const dispatch = useDispatch();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: "",
      animation: "fade",
    });
  }, [navigation]);


  const handleBack = () => {
     dispatch(setShowUploadPhoto(false)); 
    //  alert("jjjjj");
    //  console.log("5555");
  };


  useEffect(() => {
    const clearOnOpen = async () => {
      await AsyncStorage.getItem("USER_INTERESTS");
      dispatch( setSelectedInterests([]));
    };
    clearOnOpen();
  }, []);

  return (
    <>
      {showUploadPhoto ? (
        <UploadPhotoScreen
          interests={selectedInterests}
        //  setShowUploadPhoto={setShowUploadPhoto}
          handleBackInterests={handleBack}
        />

      ) : (
        <>

          <HeaderIocnText
            icon="arrow-back-circle-outline"

            onBack={handleBackInterests}
            BackheaderStyle={styles.backheaderStyle}
          />
          <SafeAreaProvider>

            <SafeAreaView style={[styles.container,]}>


              <CommpantText
                HeaderIingText="Your interests"
                SummaryText="Tell us what piques your curiosity and passions"
              />
              
              <InterestsList
                // selectedInterests={selectedInterests}
                // setSelectedInterests={setSelectedInterests}
                // setShowUploadPhoto={setShowUploadPhoto}

              />

            </SafeAreaView>

          </SafeAreaProvider>
        </>
      )}



    </>
  );
};

export default YourInterestsIndex;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    // alignItems: "center",
    flexShrink: 1,
  },

  backheaderStyle: {
    paddingRight: 0,
    paddingLeft: 0,
  }
});
