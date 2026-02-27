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

import { useNavigation } from "@react-navigation/native";
// import {setShowBnt} from "../../react-redux-store/store-comp/locationSlice";
import { useSelector, useDispatch } from "react-redux";
import IconBtn from "../components/button/icon-btn";
import { goHomeHandler } from "../react-redux-store/store-comp/goHomesliceHandler";

const LocationIndex = () => {


  const { showBtn , region } = useSelector(state => state.locationStore);

  const insets = useSafeAreaInsets();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const navigation = useNavigation();
  const dispatch = useDispatch();


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
    // navigation.goBack();
    navigation.replace("upload-your-photo");
  };

  const photos = useSelector(
    (state) => state.photosStore.photoListSelector
  );


  const address = useSelector(
    (state) => state.locationStore.address
  );

const preferences = useSelector(
  (state) => state.preferencesStore.selectedPreferences
);

const interests = useSelector(
  (state) => state.interestsStore.selectedInterests
);


const handleGoHome = async () => {
  try {
    console.log("📦 DATA:", {
      photos,
      region,
      address,
      preferences,
      interests,
    });

    const result = await dispatch(
      goHomeHandler({
        photos,
        region,
        address,
        preferences,
        interests,
      })
    ).unwrap();   // ✅ store result

    console.log("🚀 THUNK DEFINITELY RUNNING");
    console.log("Result:", result);   // { success: true }
    console.log("Preferences:", preferences);
    console.log("Interests:", interests);

const hasPhotos = photos?.some(photo => photo !== null);

if (hasPhotos) {
  navigation.replace("home");
}
  } catch (err) {
    console.log("FAILED:", err);
  }
};


// const handleGoHome = async () => {
//   try {
//     console.log("📦 DATA:", {
//       photos,
//       region,
//       address,
//     });

//     await dispatch(
//       goHomeHandler({
//         photos,
//         region,
//         address,
//       })
//     ).unwrap();

//     console.log("🚀 THUNK DEFINITELY RUNNING");

//     // navigation.replace("home");

//   } catch (err) {
//     console.log("FAILED:", err);
//   }
// };

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
                onPress={handleGoHome}
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
