import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import PhotoList from "./photo-list";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import HeaderIocnText from "../components/cutom-header/header-iocn-text";
import CommpantText from "../components/logo-text/commpant-text";


const UploadPhotoScreen = (porps) => {

  const { onBack,interests } = porps;
  const navigation = useNavigation();

  const [resetKey, setResetKey] = useState(0);

  const handleBack = () => {
    setResetKey(prev => prev + 1); // 🔥 force remount
    onBack();
  };

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
        onBack={handleBack}
        BackheaderStyle={styles.backheaderStyle}

      />
      <SafeAreaProvider>

        <SafeAreaView style={[styles.container,]}>
          <CommpantText
            HeaderIingText="Upload your photo"
            SummaryText=" We'd love to see you. Upload a photo for your dating journey."
          />

          <PhotoList resetOnBack   key={resetKey} />
        </SafeAreaView>

      </SafeAreaProvider>
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

  backheaderStyle: {
    paddingRight: 0,
    paddingLeft: 0,
  },

  container: {
    justifyContent: "flex-start",
    // alignItems: "center",
    flexShrink: 1,
  },

});
