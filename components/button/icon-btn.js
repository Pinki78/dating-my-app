import {
    StyleSheet,
    Text,
    View,
    Pressable,

} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";


import COLORS from "../../assets/style/color"; // Assuming you have a color file

const IconBtn = (props) => {

    const { IonName, onPress, navigationName, IconBtnClass, IconHeader, } = props;

    return (
        <>
            <View style={[IconHeader,]}>

                <Pressable
                    style={({ pressed }) => [
                        styles.IconBntStyle,
                        IconBtnClass,
                        pressed && styles.pressed, //
                        Platform.OS === "ios" && pressed && { opacity: 0.7 },
                    ]}


                    onPress={onPress}
                >
                    <Ionicons name={IonName} size={28} />
                </Pressable>
            </View>
        </>
    )
}

export default IconBtn

const styles = StyleSheet.create({
    IconBntStyle: {
        backgroundColor: COLORS.pinkiDark,
        borderRadius: 100,
        padding: 15,
        display: 'inline-block',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000', // optional shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,

    },

    pressed: {
        opacity: 0.5,
    }
})