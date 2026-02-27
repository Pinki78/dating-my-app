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

import AsyncStorage from "@react-native-async-storage/async-storage";

import { doc, updateDoc, setDoc, } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

import { getAuth } from "firebase/auth";




import { setLoading } from "../react-redux-store/store-comp/authSlice";

const LocationIndex = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { loading } = useSelector(
        (state) => state.authStore
    );

    const photos = useSelector(state => state.photosStore.list) || [];

    const { showBtn, locationAdded, address, region } = useSelector(state => state.locationStore);
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
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        try {
            // 1️⃣ Get preferences/interests from AsyncStorage
            const preferencesRaw = await AsyncStorage.getItem(
                `USER_PREFERENCES_${user.uid}`
            );
            console.log("Preferences from storage:", preferencesRaw);
            const interestsRaw = await AsyncStorage.getItem(
                `USER_INTERESTS_${user.uid}`
            );

            const preferences = preferencesRaw ? JSON.parse(preferencesRaw) : [];
            const interests = interestsRaw ? JSON.parse(interestsRaw) : [];

            console.log("✅ User:", user.uid);
            console.log("📸 Photos:", photos);
            console.log("📍 Location:", region);
            const userName =  user.fullName || user.name || "user";
            const docId = `${userName.trim().replace(/\s+/g, "_")}_${user.uid}`;


            // 2️⃣ Save everything to Firebase
            await setDoc(
                doc(db, "usersList", docId),
                {
                    name:  user.fullName || user.name || "",
                    email: user.email || "",
                    preferences: preferences || [],
                    interests: interests || [],
                    photos: photos,   // guaranteed to be an array
                    location: {
                        region: region || {},
                        address: address || "",
                    },
                    onboardingComplete: true,
                },
                { merge: true }
            );

            // 3️⃣ Navigate to home
            navigation.replace("home");

        } catch (error) {
            console.log("❌ Save onboarding error:", error);
        }
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
