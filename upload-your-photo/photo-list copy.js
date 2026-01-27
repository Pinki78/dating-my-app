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
import COLORS from "../assets/style/color";
import PressableIconButtonGradient from "../components/button/pressable-gradient-icon-button";
import { useFocusEffect } from '@react-navigation/native';

const PhotoList = ({
  resetOnBack
}) => {

  const MAX_PHOTOS = 6;

  const [photos, setPhotos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        // 🔥 runs when screen is unfocused (back pressed)
        setPhotos([]);
      };
    }, [])
  );

  // useEffect(() => {
  //   if (resetOnBack) {
  //     setPhotos([]);
  //   }
  // }, [resetOnBack]);

  
  // Pick image
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
      setPhotos(prev => [...prev, result.assets[0].uri]);
    }
  };



  return (
    <>
      <View >


        {/* Photo Grid */}
        <View style={styles.wrapper}>

          {/* TOP */}
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

          {/* BOTTOM */}
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


        {/* Continue Button */}
        <PressableIconButtonGradient
          ButtonTitle="Continue"
          onPress={photos}
          PressableClass={[
            { marginTop: 20 },
            !photos[0] && { opacity: 0.5 }, // 🔥 disable visual
          ]}
          disabled={!photos[0]}
        />



      </View>
    </>
  )
}

export default PhotoList

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
    height: 220, // 🔥 controls whole top height
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
    height: 90, // 🔥 exact bottom height
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

  button: {
    marginTop: "auto",
    backgroundColor: COLORS.pinkiDark,
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
