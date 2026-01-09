import { StyleSheet, Text, Pressable } from 'react-native'
import { Ionicons } from "@expo/vector-icons"; // works on both
import { LinearGradient } from "expo-linear-gradient";
import { Platform } from "react-native";
const PressableIconButton = (props) => {

  const { ButtonTitle, onPress, iconName , ClassiconName, imageClass } = props;

  return (
    <>
      <Pressable
        onPress={onPress}
        android_ripple={{ backgroundColor: "#E44358",  }}
        style={({ pressed }) => [
          styles.wrapper,
          pressed && styles.pressed,
          Platform.OS === "ios" && pressed && { opacity: 0.8 }, // 👈 opacity 0.8 on iOS
        ]}
      >
        <LinearGradient
          colors={["#E44358", "#F32944"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={styles.gradient}
        >
          {imageSource && (
          <Image source={imageSource} style={[styles.image , imageClass ]} />
        )}

        {/* Show icon if provided */}
        {iconName && (
          <Ionicons name={iconName} size={20} color="#fff" style={[styles.icon , ClassiconName ]} />
        )}
          <Text style={styles.text}>{ButtonTitle}</Text>
        </LinearGradient>
      </Pressable>
    </>
  )
}

export default PressableIconButton

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 30,
    overflow: "hidden", // required for ripple clipping
    marginBottom: 16,
  },
  pressed: {
    opacity: 0.8, // 👈 this is your "Opacity 8"
  },
  gradient: {
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 30,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
