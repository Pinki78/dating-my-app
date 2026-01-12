import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
const PressableBtn = (props) => {
  const {
    BtnTextStyles,
    btnText,
    onPress,
    imageClass,
    imageSource,
    iconName,
    ClassiconName,
    altText,
    TouchableBtn,
    ViewContentClass,
  } = props;

  return (
    <>
      <Pressable
        onPress={onPress}
        // android_ripple={{ color: "#ffffff40" }}
        // android_ripple={{  backgroundColor: "#E44358",}}

        style={({ pressed }) => [
          styles.wrapperBnt,
          TouchableBtn,
          pressed && styles.pressed, //
          Platform.OS === "ios" && pressed && { opacity: 0.7 },
        ]}
      >
        <View style={[styles.btnContent, ViewContentClass]}>
          {imageSource ? (
            <Image
              source={imageSource}
              accessible={true}
              accessibilityLabel={altText}
              style={[styles.image, imageClass]}
            />
          ) : iconName ? (
            <Ionicons
              name={iconName}
              size={20}
              color="#fff"
              style={[styles.icon, ClassiconName]}
            />
          ) : null}
          <Text style={[styles.textBtn, BtnTextStyles]}>{btnText}</Text>
        </View>
      </Pressable>
    </>
  );
};

export default PressableBtn;

const styles = StyleSheet.create({
  wrapperBnt: {
    marginBottom: 20,
    borderRadius: 56,
    // overflow: "hidden",
    shadowOffset: { width: 0, height: 8 },
    backgroundColor: "#ffffff",
    padding: 20,

    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    // Android shadow

    // padding: 20,
  },
  btnContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 8,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: "contain",
  },
});
