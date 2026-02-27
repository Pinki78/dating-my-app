import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import COLORS from "../../assets/style/color";
import { formFields } from "../data-form-user/formFields";
import PressableIconButtonGradient from "../../components/button/pressable-gradient-icon-button";

import { CommonActions } from "@react-navigation/native";

import {
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";

import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../react-redux-store/store-comp/authSlice";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearPhotos } from "../../react-redux-store/store-comp/photosSlice";
import { clearLocation } from "../../react-redux-store/store-comp/locationSlice";


const NewUsersForm = () => {
  const navigation = useNavigation();

  const { loading } = useSelector(
    (state) => state.authStore
  );

  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);
  const [openSelect, setOpenSelect] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
  });



const onSubmit = async (data) => {
  try {
    dispatch(setLoading(true));

    // 1. Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const user = userCredential.user;

    // 2. Create Firestore user document
    const userDoc = {
      uid: user.uid,
      fullName: data.fullName.trim(),
      name: data.fullName.trim(),
      email: data.email,
      role: data.role || "user",
      phone: data.phone || "",
      dob: data.dob || "",
      createdAt: serverTimestamp(),
    };

    // 🔥 Save with UID (correct)
     const docId = `${data.email.trim().replace(/\s+/g, "_")}_${user.uid}`;
   await setDoc(doc(db, "users", docId), userDoc);

    // 🔥 Only clear onboarding data AFTER successful save
    await AsyncStorage.removeItem("USER_PREFERENCES");
    await AsyncStorage.removeItem(`USER_INTERESTS_${user.uid}`);
    await AsyncStorage.removeItem("USER_PHOTOS");
    await AsyncStorage.removeItem(`USER_LOCATION`);


    dispatch(clearPhotos());
    dispatch(clearLocation());

    // 3. Sign out after registration
    await signOut(auth);

    // 4. Reset form
    reset();

    // 5. Navigate to login
    navigation.replace("log-in");

  } catch (error) {
    Alert.alert("Signup Error", error.message);
    console.log("Error during signup:", error);
    // ❌ Nothing is cleared or saved here
  } finally {
    dispatch(setLoading(false));
  }
};






  return (
    <>
      {formFields.map((fieldItms) => (
        <View key={fieldItms.id} style={styles.inputWrapper}>

          {/* ✅ SELECT (Gender) */}
          {fieldItms.type === "select" ? (
            <Controller
              control={control}
              name={fieldItms.id}

              rules={{ required: `${fieldItms.label} is required` }}
              render={({ field: { onChange, value } }) => (
                <View style={styles.selectWrapper}>
                  <Pressable
                    style={[styles.input, styles.selectoption]}
                    onPress={() =>
                      setOpenSelect((prev) =>
                        prev === fieldItms.id ? null : fieldItms.id
                      )
                    }
                  >
                    <Text style={styles.selectPlaceholder}>
                      {value
                        ? fieldItms.options.find(
                          (o) => o.value === value
                        )?.label
                        : fieldItms.placeholder}
                    </Text>

                    <Ionicons
                      name="chevron-down"
                      size={18}
                      color={COLORS.greyish}
                    />
                  </Pressable>

                  {openSelect === fieldItms.id && (
                    <View style={styles.dropdown}>
                      {fieldItms.options.map((option) => (
                        <Pressable
                          key={option.value}
                          style={styles.option}
                          onPress={() => {
                            onChange(option.value);
                            setOpenSelect(null);
                          }}
                        >
                          <Text style={styles.optionText}>
                            {option.label}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  )}
                </View>
              )}
            />
          )

            /* ✅ PASSWORD */
            : fieldItms.type === "password" ? (
              <Controller
                control={control}
                name={fieldItms.id}
                rules={{
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                }}

                render={({ field: { onChange, value } }) => (
                  <View style={styles.passwordWrapper}>
                    <TextInput
                      style={[styles.input, { flex: 1, borderWidth: 0 }]}
                      placeholder={fieldItms.placeholder}
                      placeholderTextColor={COLORS.greyish}
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry={!showPassword}
                    />

                    <Pressable style={{ marginEnd: 9, }} onPress={() => setShowPassword(!showPassword)}>
                      <Ionicons
                        name={
                          showPassword
                            ? "eye-off-outline"
                            : "eye-outline"
                        }
                        size={20}
                        color="#999"
                      />
                    </Pressable>
                  </View>
                )}
              />
            )

              /* ✅ PHONE */
              : fieldItms.type === "phone" ? (
                <Controller

                  control={control}
                  name={fieldItms.id}
                  rules={{
                    required: "Phone is required",
                    minLength: {
                      value: 10,
                      message: "Phone must be 10 digits",
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={[styles.input, styles.controllerInput]}
                      placeholder={fieldItms.placeholder}
                      placeholderTextColor={COLORS.greyish}
                      value={value}
                      keyboardType="number-pad"
                      maxLength={10}
                      onChangeText={(text) =>
                        onChange(text.replace(/[^0-9]/g, ""))
                      }
                    />
                  )}
                />
              )

                /* ✅ DOB */
                : fieldItms.type === "date" ? (
                  <Controller

                    control={control}
                    name={fieldItms.id}
                    rules={{
                      required: "DOB is required",
                      pattern: {
                        value:
                          /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                        message: "Use DD/MM/YYYY",
                      },
                    }}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        style={[styles.input, styles.controllerInput]}
                        placeholder={fieldItms.placeholder}
                        placeholderTextColor={COLORS.greyish}
                        value={value}
                        keyboardType="number-pad"
                        maxLength={10}
                        onChangeText={(text) => {
                          const cleaned = text
                            .replace(/\D/g, "")
                            .slice(0, 8);

                          let formatted = cleaned;

                          if (cleaned.length > 2)
                            formatted =
                              cleaned.slice(0, 2) +
                              "/" +
                              cleaned.slice(2);

                          if (cleaned.length > 4)
                            formatted =
                              cleaned.slice(0, 2) +
                              "/" +
                              cleaned.slice(2, 4) +
                              "/" +
                              cleaned.slice(4);

                          onChange(formatted);
                        }}
                      />
                    )}
                  />
                )

                  /* ✅ TEXT + EMAIL */
                  : (
                    <Controller
                      control={control}

                      name={fieldItms.id}
                      rules={
                        fieldItms.type === "email"
                          ? {
                            required: "Email is required",
                            pattern: {
                              value:
                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Invalid email",
                            },
                          }
                          : { required: `${fieldItms.label} is required` }
                      }
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          style={[styles.input, styles.controllerInput]}
                          placeholder={fieldItms.placeholder}
                          placeholderTextColor={COLORS.greyish}
                          value={value}
                          onChangeText={onChange}
                          autoCapitalize="none"
                          keyboardType={
                            fieldItms.type === "email"
                              ? "email-address"
                              : "default"
                          }
                        />
                      )}
                    />
                  )}

          {/* ✅ ERROR */}
          {errors[fieldItms.id]?.message && (
            <Text style={styles.errorText}>
              {errors[fieldItms.id]?.message}
            </Text>
          )}

        </View>
      ))}

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
  controllerInput: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.greyCcc,
    borderRadius: 6,
    padding: 12,

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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.greyCcc,
    borderRadius: 6,
    marginBottom: 10,
  },
  selectWrapper: { width: '100%', marginBottom: 10, },
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
