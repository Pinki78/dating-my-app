import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import COLORS from '../../assets/style/color';
import { formFields } from '../data-form-user/formFields';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from "react-hook-form";
import React, { useState } from 'react';
import PressableIconButtonGradient from '../../components/button/pressable-gradient-icon-button';

import { useNavigation } from "@react-navigation/native";

import { Platform } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from '../../firebase/firebase';



const NewUsersForm = () => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);

    const [openSelect, setOpenSelect] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        mode: 'onBlur',
        defaultValues: {
            name: '',
            email: '',
            password: '',
            role: '',
        }
    });

    const onSubmit = async (data) => {
        if (loading) return;
        setLoading(true);

        try {
            console.log("1. Starting signup");

            const { email, password, name, role } = data;

            const userCredential = await createUserWithEmailAndPassword(
                auth,

                email,
                password
            );

            console.log("2. User created", userCredential.user.uid);

            await setDoc(doc(db, "users", userCredential.user.uid), {
                name,
                email,
                role,
                createdAt: serverTimestamp(),
            });

            console.log("3. Firestore saved");

            reset();
            console.log("4. Form reset");

            navigation.replace("log-in");
            console.log("5. Navigation called");

        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                Alert.alert(
                    "Already registered",
                    "This email is already registered. Please log in.",
                    [{ text: "Go to Login", onPress: () => navigation.replace("log-in") }]
                );
                console.log("Signup error:", error);   // 👈 ADD THIS
            } else {
                Alert.alert("Error", error.message);

            }
        } finally {
            setLoading(false);

        }
    };





    return (
        <>
            {formFields.map(fieldItms => (
                <View key={fieldItms.id} style={styles.inputWrapper}>
                    {fieldItms.type === 'select' ? (
                        <Controller
                            control={control}
                            name={fieldItms.id}
                            rules={{ required: `${fieldItms.placeholder} is required` }}
                            render={({ field: { onChange, value } }) => (
                                <View style={styles.selectWrapper}>
                                    <Pressable
                                        style={[styles.input, styles.selectoption]}
                                        onPress={() =>
                                            setOpenSelect(prev => (prev === fieldItms.id ? null : fieldItms.id))
                                        }
                                    >
                                        <Text style={[styles.selectPlaceholder, value && styles.selected, { color: COLORS.greyishy }]}>
                                            {value
                                                ? fieldItms.options.find(o => o.value === value)?.label
                                                : fieldItms.placeholder}
                                        </Text>
                                        <Ionicons name="chevron-down" size={18} color={COLORS.greyishy} />
                                    </Pressable>

                                    {openSelect === fieldItms.id && (
                                        <View style={styles.dropdown}>
                                            {fieldItms.options.map(option => (
                                                <Pressable
                                                    key={option.value}
                                                    style={[styles.option, { fontFamily: 'Urbanist_600SemiBold', }]}
                                                    onPress={() => {
                                                        onChange(option.value);
                                                        setOpenSelect(null);
                                                    }}
                                                >
                                                    <Text style={[styles.optionText, { fontFamily: 'Urbanist_600SemiBold', }]}>{option.label}</Text>
                                                </Pressable>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            )}
                        />
                    ) : fieldItms.type === 'password' ? (
                        <Controller
                            control={control}
                            name={fieldItms.id}
                            rules={{
                                required: `${fieldItms.placeholder} is required`,
                                minLength: { value: 6, message: "Min 6 characters" },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <View style={styles.passwordWrapper}>
                                    <TextInput
                                        style={[styles.input, styles.passwordInput, { flex: 1, borderWidth: 0, marginBottom: 0 }]}
                                        placeholder={fieldItms.placeholder}
                                        placeholderTextColor={COLORS.greyishy}
                                        value={value}
                                        onChangeText={onChange}
                                        secureTextEntry={!showPassword}
                                    />
                                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                                        <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#999" />
                                    </Pressable>
                                </View>
                            )}
                        />
                    ) : (
                        <Controller
                            control={control}
                            name={fieldItms.id}
                            rules={
                                fieldItms.type === 'email'
                                    ? {
                                        required: `${fieldItms.placeholder} is required`,
                                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" }
                                    }
                                    : { required: `${fieldItms.placeholder} is required` }
                            }
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder={fieldItms.placeholder}
                                    placeholderTextColor={COLORS.greyishy}
                                    value={value}
                                    onChangeText={onChange}
                                    autoCapitalize="none"
                                    keyboardType={fieldItms.type === 'email' ? 'email-address' : 'default'}
                                />
                            )}
                        />
                    )}

                    {errors[fieldItms.id]?.message && (
                        <Text style={styles.errorText}>{errors[fieldItms.id]?.message}</Text>
                    )}
                </View>
            ))}

            {/* <PressableIconButtonGradient ButtonTitle="Sign Up" onPress={handleSubmit(onSubmit)} /> */}
            <PressableIconButtonGradient
                ButtonTitle={loading ? "Please wait..." : "Sign Up"}
                onPress={handleSubmit(onSubmit)}
                disabled={loading}
            />
        </>
    );
};

export default NewUsersForm;

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: COLORS.greyCcc,
        borderRadius: 6,
        padding: 12,
        marginBottom: 10,
        fontFamily: 'Urbanist_600SemiBold',
    },
    inputWrapper: {
        width: '100%',
        marginBottom: 8,
    },
    passwordInput: {
        marginBottom: 0,
    },
    passwordWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.greyCcc,
        borderRadius: 6,
        // paddingHorizontal: 12,
        // paddingVertical: 12,
        marginBottom: 10,
    },
    selectWrapper: { width: '100%' },
    selectoption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontFamily: 'Urbanist_600SemiBold',
    },
    selectPlaceholder: { fontFamily: 'Urbanist_600SemiBold', },
    dropdown: {
        position: 'absolute',
        top: 52,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.15)',
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 5,
        zIndex: 1000,
        elevation: 5,
    },
    optionText: { padding: 10 },
    errorText: {
        color: COLORS.red,
        fontSize: 12,
        marginTop: 4,
          fontFamily: 'Urbanist_600SemiBold',
    },
});
