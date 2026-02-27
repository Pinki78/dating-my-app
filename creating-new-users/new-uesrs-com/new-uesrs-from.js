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
import { setLoading, setShow, setOpenSelect, setShowPassword } from "../../react-redux-store/store-comp/authSlice";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearPhotos } from "../../react-redux-store/store-comp/photosSlice";
import { clearLocation } from "../../react-redux-store/store-comp/locationSlice";

import DateTimePicker from '@react-native-community/datetimepicker';
const NewUsersForm = () => {
  const navigation = useNavigation();

  const { loading, show, openSelect , showPassword } = useSelector(
    (state) => state.authStore
  );

  const dispatch = useDispatch();

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

    // 1️⃣ Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email.trim(),
      data.password
    );

    const user = userCredential.user;

    // 2️⃣ Create custom document ID
    const docId = `${data.email.trim().replace(/\s+/g, "_")}_${user.uid}`;

    // 3️⃣ Create Firestore document
    const userDoc = {
      uid: user.uid,
      name: data.fullName.trim(),
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      role: data.role || "user",
      phone: data.phone || "",
      dob: data.dob || "",
      createdAt: serverTimestamp(),
      onboardingComplete: false,
    };

    await setDoc(doc(db, "users", docId), userDoc);

    await signOut(auth);
    reset();
    navigation.replace("log-in");

  } catch (error) {
    console.log("Signup Error:", error);
    Alert.alert("Signup Error", error.message);
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
                      dispatch(
                        setOpenSelect(
                          openSelect === fieldItms.id ? null : fieldItms.id
                        )
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
                            dispatch(setOpenSelect(null));
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

                    <Pressable style={{ marginEnd: 9, }} onPress={() => dispatch(setShowPassword(!showPassword))}>
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
                    rules={{ required: "DOB is required" }}
                    render={({ field: { onChange, value } }) => {

                      const parsedDate = value
                        ? new Date(value.split("/").reverse().join("-"))
                        : new Date();

                      return (
                        <>
                          <Pressable
                            onPress={() => dispatch(setShow(true))}
                            style={[styles.input, styles.controllerInput]}
                          >
                            <Text style={{ color: value ? "#000" : COLORS.greyish }}>
                              {value || fieldItms.placeholder}
                            </Text>
                          </Pressable>

                          {show && (
                            <DateTimePicker
                              value={parsedDate}
                              mode="date"
                              // display="calendar"   
                              display="spinner"


                              maximumDate={new Date()}
                              accentColor="#f10020"
                              textColor="#E44358"   // 👈 iOS only
                              themeVariant="dark"  // or "light"
                              onChange={(event, selectedDate) => {
                                if (event.type === "dismissed") {

                                  dispatch(setShow(false));
                                  return;
                                }

                                dispatch(setShow(false));

                                if (selectedDate) {
                                  const day = String(selectedDate.getDate()).padStart(2, "0");
                                  const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
                                  const year = selectedDate.getFullYear();
                                  onChange(`${day}/${month}/${year}`);
                                }
                              }}
                            />
                          )}
                        </>
                      );
                    }}
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
