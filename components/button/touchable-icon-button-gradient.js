import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from "@expo/vector-icons"; // works on both
import { LinearGradient } from "expo-linear-gradient";
import { Platform } from "react-native";
const TouchableIconButton = (props) => {

  const { ButtonTitle, onPress, imageClass, imageSource, iconName, ClassiconName, altText } = props;

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        android_ripple={{ color: "#ffffff40" }}
        style={({ pressed }) => [
          styles.wrapper,
          pressed && styles.buttonHovered, //
          Platform.OS === "ios" && pressed && { opacity: 0.2 },
        ]}
      >
        <LinearGradient
          colors={["#E44358", "#F32944"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={styles.gradient}
        >
          {imageSource ? (
            <Image source={imageSource} accessible={true} accessibilityLabel={altText}  style={[styles.image, imageClass]} />
          ) : iconName ? (
            <Ionicons name={iconName} size={20} color="#fff" style={[styles.icon, ClassiconName]} />
          ) : null}
          <Text style={styles.text}>{ButtonTitle}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </>
  )
}

export default TouchableIconButton

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 30,
    overflow: "hidden", // 👈 required for ripple clipping
    marginBottom: 16,
  },

  gradient: {
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 30,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",

  },
  image: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: "contain",
  },
})