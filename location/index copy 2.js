import {
    View, StyleSheet, Pressable, ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { useLayoutEffect, useState, useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderIocnText from "../components/cutom-header/header-iocn-text";
import CommpantText from "../components/logo-text/commpant-text";
import PickLocation from "./location-compant/pick-location";

// import {setShowBnt} from "../../react-redux-store/store-comp/locationSlice";
import { useSelector, useDispatch } from "react-redux";
import IconBtn from "../components/button/icon-btn";


import { doc, updateDoc, setDoc , } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

import { getAuth } from "firebase/auth";




import { setLoading } from "../react-redux-store/store-comp/authSlice";

const LocationIndex = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const {  loading } = useSelector(
        (state) => state.authStore
    );


    const { showBtn } = useSelector(state => state.locationStore);
    // onPress={() => navigation.navigate(navigationName)}

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
        const show = Keyboard.addListener('keyboardDidShow', e => {
            setKeyboardHeight(e.endCoordinates.height);
        });
        const hide = Keyboard.addListener('keyboardDidHide', () => {
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


const goHomeHandler = async () => {
    // try {
    //     dispatch(setLoading(true));

   
    //     // Go to home screen
    //     navigation.replace("home");
    // } catch (error) {
    //     console.log("Location Save Error:", error);
    // } finally {
    //     dispatch(setLoading(false));
    // }

    const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return;

  // 1️⃣ Get preferences/interests from AsyncStorage
  const preferencesRaw = await AsyncStorage.getItem("USER_PREFERENCES");
  const interestsRaw = await AsyncStorage.getItem(`USER_INTERESTS_${user.uid}`);
  const preferences = preferencesRaw ? JSON.parse(preferencesRaw) : [];
  const interests = interestsRaw ? JSON.parse(interestsRaw) : [];

  // 2️⃣ Get photos & location from Redux
  const photos = useSelector(state => state.photosStore.list);
  const location = useSelector(state => state.locationStore.region); // or full location object
    console.log("✅ User:", user.uid);
  // 3️⃣ Save everything to Firebase
  await setDoc(
    doc(db, "users", user.uid),
    {
      preferences,
      interests,
      photos,
      location,
      onboardingComplete: true,
    },
    { merge: true } // merge with existing user data
  );

  // 4️⃣ Navigate to home screen
  navigation.replace("home");
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
