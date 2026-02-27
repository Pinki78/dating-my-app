import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useLayoutEffect, useState, useEffect } from "react";

// import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import HeaderIocnText from "../components/cutom-header/header-iocn-text";
import CommpantText from "../components/logo-text/commpant-text";
import PickLocation from "./location-compant/pick-location";

// import {setShowBnt} from "../../react-redux-store/store-comp/locationSlice";
import { useSelector, useDispatch } from "react-redux";
import IconBtn from "../components/button/icon-btn";
import { goHomeHandler } from "../react-redux-store/store-comp/goHomesliceHandler";

const LocationIndex = () => {
  const insets = useSafeAreaInsets();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  // const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: "",
      animation: "fade",
    });
  }, [navigation]);

  /* 🔹 SAVE Redux photos → AsyncStorage */

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hide = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const handleBack = () => {
    // navigation.goBack('upload-your-photo');
    navigation.goBack();
  };

  return (
    <>
      <SafeAreaProvider>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={[styles.container]}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: keyboardHeight + 20,
              }}
            >
              <HeaderIocnText
                icon="arrow-back-circle-outline"
                onBack={handleBack}
                BackheaderStyle={styles.backheaderStyle}
              />

              <CommpantText
                HeaderIingText="Enable your location"
                SummaryText="Choose your location to start find people around you."
              />

              <PickLocation />
            </ScrollView>

            {showBtn && (
              <IconBtn
                IonName="arrow-forward-outline"
                onPress={goHomeHandler}
              />
            )}
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </SafeAreaProvider>
    </>
  );
};

export default LocationIndex;

const styles = StyleSheet.create({
  backheaderStyle: {
    paddingRight: 0,
    paddingLeft: 0,
  },

  container: {
    justifyContent: "flex-start",
    paddingHorizontal: 24,
    flexShrink: 1,
  },
});
