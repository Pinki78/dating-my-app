import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { useLayoutEffect, useState ,useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import PhotoList from "./photo-list";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import HeaderIocnText from "../components/cutom-header/header-iocn-text";


const UploadPhotoScreen = (porps) => {
    const { onBack, } = porps;
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: '',
      animation: 'fade',
    })
  }, [navigation])


  return (
   <>
 <HeaderIocnText
            icon="arrow-back-circle-outline"

            onBack={onBack}
            BackheaderStyle={styles.backheaderStyle}
          />

   <PhotoList />
   </>
  );
};

export default UploadPhotoScreen;
const styles = StyleSheet.create({
  // container: {
  //   justifyContent: "flex-start",
  //   // alignItems: "center",
  //   flexShrink: 1,
  // },

  // backheaderStyle: {
  //   paddingRight: 0,
  //   paddingLeft: 0,
  // }
});
