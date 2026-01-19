import { StyleSheet, Text, View, TextInput, Pressable, Platform, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import PressableIconButtonGradient from '../../components/button/pressable-gradient-icon-button';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import COLORS from '../../assets/style/color';
const LoginFrom = () => {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { identity: "", password: "", remember: false },
        mode: "onSubmit",
    });

    const onSubmit = async ({ identity, password }) => {
        try {
            await signInWithEmailAndPassword(auth, identity, password);
            // 🔹 No navigation here — App.js handles it
        } catch (error) {
            let msg = "Login failed";
            if (error.code === "auth/user-not-found") msg = "No account found";
            else if (error.code === "auth/wrong-password") msg = "Incorrect password";
            else if (error.code === "auth/invalid-email") msg = "Invalid email";

            Alert.alert("Login Error", msg);
        }
    };

    return (
        <>
            <View>
                <Controller
                    control={control}
                    name="identity"
                    rules={{ required: "Required" }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput style={styles.input} placeholder="Email"
                         placeholderTextColor={COLORS.greyishy}
                          value={value} onChangeText={onChange} />
                    )}
                />
                {errors.identity && <Text style={styles.error}>{errors.identity.message}</Text>}

                <Controller
                    control={control}
                    name="password"
                    rules={{ required: "Password required" }}
                    render={({ field: { onChange, value } }) => (
                        <View style={styles.passwordWrapper}>
                            <TextInput
                                style={[styles.input, styles.passwordInput, { flex: 1, borderWidth: 0 }]}
                                placeholder="Password"
                                placeholderTextColor={COLORS.greyishy}
                                secureTextEntry={!showPassword}
                                value={value}
                                onChangeText={onChange}
                            />
                            <Pressable onPress={() => setShowPassword(!showPassword)} style={{marginRight:12}}>
                                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#999" />
                            </Pressable>
                        </View>
                    )}
                />
                <View>
                    {errors.password && <Text style={[styles.error , {color: COLORS.red,}]}>{errors.password.message}</Text>}
                </View>

                <PressableIconButtonGradient ButtonTitle="Log In" onPress={handleSubmit(onSubmit)} />
            </View>

            <Pressable onPress={() => navigation.navigate('forgot-password')}>
                <Text style={styles.resetHereText}>Forgot password?</Text>
            </Pressable>
        </>
    );
};

export default LoginFrom;

const styles = StyleSheet.create({

    input: {
        borderWidth: 1,
        borderColor: COLORS.greyCcc,
        borderRadius: 6,
        padding: 12,
        marginBottom: 10,
        fontFamily: 'Urbanist_600SemiBold',
    },
    passwordInput: {
        marginBottom: 0,
    },
    passwordWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.greyCcc,
        borderRadius: 6,
        marginBottom: 20,
    },

    error: {
        color: COLORS.red,
        marginBottom: 8,
        fontSize: 12,
        //   backgroundColor: "yellow", // TEMP — to see it
        paddingVertical: 2,
         fontFamily: 'Urbanist_600SemiBold',
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
        color: COLORS.grey595959,
        fontSize: 14,
    },
    forgetPasswordWrapper: {
        textAlign: 'center',
        justifyContent: 'center',
        // display: 'block',
    },
    Text2: {
        fontFamily: 'Mulish_500Medium',
        color: COLORS.grey747474,
        fontSize: 14,
        textAlign: 'center',
        // backgroundColor: 'yellow'
    },
    resetHereBtn: {
        paddingVertical: 4,
    },

    resetHereText: {   // 👈 MOVE HERE
        color:COLORS.blue2A3E93,
        fontSize: 12,
        fontFamily: 'none',
        fontFamily: "Mulish_600SemiBold",
        textAlign: 'center',
    },
    pressed: {
        opacity: 0.4, // 👈 this is your "Opacity 8"
        
    }
})
