import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../assets/style/color";

const PhotoList = () => {
const MAX_PHOTOS = 6;


      const [photos, setPhotos] = useState([]);
    
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
       <View style={styles.container}>
      <Text style={styles.title}>Upload your photo</Text>
      <Text style={styles.sub}>
        We'd love to see you. Upload a photo for your dating journey.
      </Text>

      {/* Photo Grid */}
      <View style={styles.grid}>
        {Array.from({ length: MAX_PHOTOS }).map((_, index) => {
          const photo = photos[index];

          return (
            <Pressable
              key={index}
              style={styles.box}
              onPress={pickImage}
            >
              {photo ? (
                <Image source={{ uri: photo }} style={styles.image} />
              ) : (
                <Ionicons
                  name="add"
                  size={30}
                  color={COLORS.pinkiDark}
                />
              )}
            </Pressable>
          );
        })}
      </View>

      {/* Continue Button */}
      <Pressable
        style={[
          styles.button,
          photos.length === 0 && { opacity: 0.5 },
        ]}
        disabled={photos.length === 0}
        onPress={() => console.log("Photos:", photos)}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
    </View>
    </>
  )
}

export default PhotoList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  sub: {
    fontSize: 14,
    textAlign: "center",
    color: "#777",
    marginVertical: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 20,
  },
  box: {
    width: "30%",
    aspectRatio: 1,
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