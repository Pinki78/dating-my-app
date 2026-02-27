import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

import { formFields } from "../data-form-user/formFields";

// ---------- FORMAT HELPERS ----------

// PHONE
const formatPhone = (text) => {
  return text.replace(/[^0-9]/g, "").slice(0, 10);
};

// DOB
const formatDOB = (text) => {
  const cleaned = text.replace(/\D/g, "").slice(0, 8);

  if (cleaned.length < 3) return cleaned;
  if (cleaned.length < 5)
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;

  return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4)}`;
};

const RegisterForm = () => {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    mode: "onSubmit",
  });

  // ---------- SUBMIT ----------
  const onSubmit = async (data) => {
    try {

      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      Alert.alert("Success", "Account created!");

      // 🔥 DO NOT NAVIGATE
      // Let Firebase auth listener handle auto-login

    } catch (error) {

      let msg = "Signup failed";

      if (error.code === "auth/email-already-in-use")
        msg = "Email already in use";

      if (error.code === "auth/invalid-email")
        msg = "Invalid email";

      if (error.code === "auth/weak-password")
        msg = "Password should be at least 6 characters";

      Alert.alert("Error", msg);
    }
  };

  return (
    <View style={{ padding: 20 }}>

      {formFields.map((fieldItms) => (
        <View key={fieldItms.id}>

          <Controller
            control={control}
            name={fieldItms.id}

            rules={{
              required: `${fieldItms.label} is required`,

              ...(fieldItms.type === "email" && {
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email",
                },
              }),

              ...(fieldItms.type === "phone" && {
                minLength: {
                  value: 10,
                  message: "Phone must be 10 digits",
                },
              }),

              ...(fieldItms.type === "password" && {
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }),
            }}

            render={({ field: { onChange, value } }) => {

              // ---------- SELECT ----------
              if (fieldItms.type === "select") {
                return (
                  <View style={styles.pickerWrapper}>
                    <Picker
                      selectedValue={value}
                      onValueChange={onChange}
                    >
                      <Picker.Item
                        label={fieldItms.placeholder}
                        value=""
                      />

                      {fieldItms.options.map((opt) => (
                        <Picker.Item
                          key={opt.value}
                          label={opt.label}
                          value={opt.value}
                        />
                      ))}
                    </Picker>
                  </View>
                );
              }

              // ---------- TEXT INPUT ----------
              return (
                <TextInput
                  style={styles.input}
                  placeholder={fieldItms.placeholder}
                  value={value}
                  maxLength={fieldItms.maxLength}

                  secureTextEntry={
                    fieldItms.type === "password"
                  }

                  autoCapitalize={
                    fieldItms.autoCapitalize || "sentences"
                  }

                  keyboardType={
                    fieldItms.type === "email"
                      ? "email-address"
                      : fieldItms.type === "phone" ||
                        fieldItms.type === "date"
                      ? "number-pad"
                      : "default"
                  }

                  onChangeText={(text) => {

                    if (fieldItms.type === "phone") {
                      onChange(formatPhone(text));
                      return;
                    }

                    if (fieldItms.type === "date") {
                      onChange(formatDOB(text));
                      return;
                    }

                    if (fieldItms.type === "email") {
                      onChange(text.trim().toLowerCase());
                      return;
                    }

                    onChange(text);
                  }}
                />
              );
            }}
          />

          {/* ERROR */}
          {errors[fieldItms.id] && (
            <Text style={styles.error}>
              {errors[fieldItms.id].message}
            </Text>
          )}
        </View>
      ))}

      {/* BUTTON */}
      <Pressable
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Create Account
        </Text>
      </Pressable>

    </View>
  );
};

export default RegisterForm;


// ---------- STYLES ----------
const styles = StyleSheet.create({

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
  },

  button: {
    backgroundColor: "#6C63FF",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  error: {
    color: "red",
    marginBottom: 8,
  },
});
