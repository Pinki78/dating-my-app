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

const YourInterestsIndex = (props) => {

  const {  handleBackInterests,  } = props;

  const [showUploadPhoto, setShowUploadPhoto] = useState(false)
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: "",
      animation: "fade",
    });
  }, [navigation]);


  // const handleBack = async () => {
  //   await AsyncStorage.removeItem("USER_INTERESTS");
  //   setSelectedInterests([]);
  //   onBack();
  // };

  const [selectedInterests, setSelectedInterests] = useState([]);

  
  useEffect(() => {
    const clearOnOpen = async () => {
      await AsyncStorage.getItem("USER_INTERESTS");
      setSelectedInterests([]);
    };
    clearOnOpen();
  }, []);

  return (
    <>
      {showUploadPhoto ? (
        <UploadPhotoScreen
          interests={selectedInterests}
          setShowUploadPhoto={setShowUploadPhoto}
          handleBackInterests={handleBackInterests}
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
                selectedInterests={selectedInterests}
                setSelectedInterests={setSelectedInterests}
                setShowUploadPhoto={setShowUploadPhoto}

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
