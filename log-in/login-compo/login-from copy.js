import { StyleSheet, Text, View, TextInput, Pressable, Linking } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import PressableIconButton from '../../components/button/pressable-icon-button';
import { Platform } from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Alert } from "react-native";



const LoginFrom = () => {
    //     const [text, onChangeText] = useState('');
    //   const [password, onChangePassword] = React.useState('');
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate('forgot-password');
    };
    const [showPassword, setShowPassword] = useState(false);


    const { control, handleSubmit, formState: { errors } } = useForm(
        {
            defaultValues: {
                identity: "",   // username OR email OR phone
                password: "",
                remember: false,
            },
            mode: "onSubmit", // or "onChange"
        }
    );
    // const onSubmit = (data) => {
    //     console.log("Submitted:", data);
    // };

    const onSubmit = async (data) => {
  try {
    const { identity, password } = data;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(identity)) {
      Alert.alert("Login Error", "Please enter a valid email address");
      return;
    }

    await signInWithEmailAndPassword(auth, identity, password);

    navigation.replace("prefer-list"); // ✅ go to home
  } catch (error) {
    console.log("Login error:", error);

    let msg = "Login failed";

    if (error.code === "auth/user-not-found") msg = "No account found with this email";
    else if (error.code === "auth/wrong-password") msg = "Incorrect password";
    else if (error.code === "auth/invalid-credential") msg = "Invalid email or password";
    else if (error.code === "auth/invalid-email") msg = "Invalid email format";

    Alert.alert("Login Error", msg);
  }
};



    return (
        <>
            <View>
                <View>
                    <Controller
                        control={control}
                        name="identity"
                        rules={{
                            required: "Required",
                            validate: (value) => {
                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                const phoneRegex = /^[0-9]{10}$/;
                                const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;

                                if (
                                    emailRegex.test(value) ||
                                    phoneRegex.test(value) ||
                                    usernameRegex.test(value)
                                ) {
                                    return true;
                                }

                                return "Enter valid Email, Phone or Username";
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={[styles.input, { fontFamily: "Mulish_400Regular" }]}
                                placeholder="Username / Email / Number"
                                placeholderTextColor="#aaa"

                                value={value}
                                onChangeText={onChange}
                                autoCapitalize="none"
                            />
                        )}
                    />
                    {errors.identity?.message && (
                        <Text style={[styles.error,{ fontSize: 12, marginTop: 4, color: 'red' }]}>{errors.identity.message}</Text>
                    )}
                </View>
                <View>
                    <Controller
                        control={control}
                        name="password"
                        rules={{ required: "Password is required" }}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.passwordWrapper}>
                                <TextInput
                                    style={[styles.input, { fontFamily: "Mulish_400Regular", flex: 1, borderWidth: 0, marginBottom: 0, paddingVertical: 0, paddingHorizontal: 2 }]}
                                    placeholder="Password"
                                    value={value}
                                    onChangeText={onChange}
                                    secureTextEntry={!showPassword}
                                    placeholderTextColor="#aaa"
                                />
                                <Pressable onPress={() => setShowPassword(!showPassword)}>
                                    <Ionicons
                                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                                        size={20}
                                        color="#999"
                                    />
                                </Pressable>
                            </View>
                        )}
                    />


                    {errors.password?.message && (
                        <Text style={[styles.error,{ fontSize: 12, marginTop: 4, color: 'red',fontFamily:' Inter_600SemiBold', }]}>{errors.password.message}</Text>
                    )}
                </View>

                <View>

                    <Controller
                        control={control}
                        name="remember"
                        render={({ field: { value, onChange } }) => (
                            <Pressable
                                style={styles.rememberWrapper}
                                onPress={() => onChange(!value)}
                            >
                                <Ionicons
                                    name={value ? "checkbox-outline" : "square-outline"}
                                    size={20}
                                    color="#007AFF"
                                />
                                <Text style={styles.rememberText}>Remember me</Text>
                            </Pressable>
                        )}
                    />
                </View>

                <PressableIconButton
                    ButtonTitle="Log In"
                    onPress={handleSubmit(onSubmit)}
                />
            </View>

            <View style={styles.forgetPasswordWrapper}>
                <Text style={[styles.forgetPasswordText, styles.Text2]}>
                    Did you forgot your password?

                </Text>
                <Pressable
                    style={({ pressed }) => [
                        styles.resetHereBtn,
                        pressed && styles.pressed,
                        Platform.OS === "ios" && pressed && { opacity: 0.8 }, // 👈 opacity 0.8 on iOS
                    ]}
                    onPress={handlePress}

                >

                    <Text style={[styles.resetHereText, ]}>Reset here</Text>

                </Pressable>
            </View>

        </>
    )
}

export default LoginFrom

const styles = StyleSheet.create({

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 12,
        marginBottom: 10,
        fontFamily: 'Urbanist_600SemiBold',
    },
    passwordWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 12,
        marginBottom: 20,
    },

    error: {
        color: "red",
        marginBottom: 8,
        fontSize: 12,
        //   backgroundColor: "yellow", // TEMP — to see it
        paddingVertical: 2,
        fontFamily:' Inter_700Bold',
    },
    rememberWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    rememberText: {
        marginLeft: 8,
        fontFamily: "Mulish_600SemiBold",
        color: '#595959',
        fontSize: 14,
    },
    forgetPasswordWrapper: {
        textAlign: 'center',
        justifyContent: 'center',
        // display: 'block',
    },
    Text2: {
         fontFamily: 'Mulish_500Medium',
                color: '#747474',
                fontSize: 14,
                textAlign: 'center',
                // backgroundColor: 'yellow'
    },
    resetHereBtn: {
        paddingVertical: 4,
    },

    resetHereText: {   // 👈 MOVE HERE
        color: '#2A3E93',
        fontSize: 12,
        fontFamily:'none',
        fontFamily: "Mulish_600SemiBold",
        textAlign: 'center',
    },
    pressed: {
        opacity: 0.4, // 👈 this is your "Opacity 8"
         color: '#002fff'
    }
})