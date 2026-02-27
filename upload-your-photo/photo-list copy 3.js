import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import COLORS from "../assets/style/color";
import PressableIconButtonGradient from "../components/button/pressable-gradient-icon-button";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addPhoto, clearPhotos} from "../react-redux-store/store-comp/photosSlice";

const PhotoList = ({setShowUploadPhoto , handleBackInterests}) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const STORAGE_KEY = "USER_PHOTOS";
  const MAX_PHOTOS = 6;

    // ✅ Redux state 
  const photos = useSelector(state => state.photosStore.list);

  // const [photos, setPhotos] = useState([]);

useEffect(() => {
  const loadPhotos = async () => {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);

    dispatch(clearPhotos()); // ✅ RESET first

    if (saved) {
      const parsed = JSON.parse(saved);
      parsed.forEach(uri => dispatch(addPhoto(uri)));
    }
  };

  loadPhotos();
}, []);


  /* 🔹 SAVE Redux photos → AsyncStorage */
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  }, [photos]);

  /* 🔹 CLEAR when BACK pressed */
  // useFocusEffect(
  //   useCallback(() => {
  //     return () => {
  //       dispatch(clearPhotos());
  //       // AsyncStorage.removeItem(STORAGE_KEY);
  //        AsyncStorage.getItem(STORAGE_KEY);
  //         // setShowUploadPhoto(true);
  //         // handleBackInterests()
  //     };
  //   }, [])
  // );

  /* 🔹 Pick image */
  const pickImage = async () => {
    if (photos.length >= MAX_PHOTOS) return;

    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      // dispatch(addPhoto(result.assets[0].uri));
      dispatch(addPhoto({ uri: result.assets[0].uri, index }));
    }
  };


  /* 🔹 Continue button handler */
  const handleContinue = () => {
      navigation.navigate("location");
    console.log("Final photos:", photos);
    // navigate / upload / next step
  };

  return (
    <View>

      {/* PHOTO GRID */}
      <View style={styles.wrapper}>

        {/* TOP ROW */}
        <View style={styles.topRow}>
          {/* BIG LEFT */}
          <Pressable style={styles.bigBox} onPress={pickImage}>
            {photos[0] ? (
              <Image source={{ uri: photos[0] }} style={styles.image} />
            ) : (
              <Ionicons name="add" size={34} color={COLORS.pinkiDark} />
            )}
          </Pressable>

          {/* RIGHT COLUMN */}
          <View style={styles.rightCol}>
            {[1, 2].map(i => (
              <Pressable key={i} style={styles.rightBox} onPress={pickImage}>
                {photos[i] ? (
                  <Image source={{ uri: photos[i] }} style={styles.image} />
                ) : (
                  <Ionicons name="add" size={26} color={COLORS.pinkiDark} />
                )}
              </Pressable>
            ))}
          </View>
        </View>

        {/* BOTTOM ROW */}
        <View style={styles.bottomRow}>
          {[3, 4, 5].map(i => (
            <Pressable key={i} style={styles.bottomBox} onPress={pickImage}>
              {photos[i] ? (
                <Image source={{ uri: photos[i] }} style={styles.image} />
              ) : (
                <Ionicons name="add" size={26} color={COLORS.pinkiDark} />
              )}
            </Pressable>
          ))}
        </View>
      </View>

      {/* CONTINUE BUTTON */}
      <PressableIconButtonGradient
        ButtonTitle="Continue"
        onPress={handleContinue}
        disabled={!photos[0]}
        PressableClass={[
          { marginTop: 20 },
          !photos[0] && { opacity: 0.5 },
        ]}
      />
    </View>
  );
};

export default PhotoList;

const GAP = 12;

const styles = StyleSheet.create({
  wrapper: {
    gap: GAP,
    marginTop: 20,
    marginBottom: 20,
  },

  topRow: {
    flexDirection: "row",
    gap: GAP,
    height: 220,
  },

  bigBox: {
    flex: 2,
    borderRadius: 18,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: COLORS.pinkiDark,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  rightCol: {
    flex: 1,
    gap: GAP,
  },

  rightBox: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: COLORS.pinkiDark,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  bottomRow: {
    flexDirection: "row",
    gap: GAP,
    height: 90,
  },

  bottomBox: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: COLORS.pinkiDark,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },
});
