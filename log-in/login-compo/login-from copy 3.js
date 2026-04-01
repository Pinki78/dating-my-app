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
import { useDispatch , useSelector } from "react-redux";

import COLORS from "../../assets/style/color";
import PressableIconButtonGradient from "../../components/button/pressable-gradient-icon-button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

import { setLoading } from "../../react-redux-store/store-comp/authSlice";

const LoginFrom = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const { loading } = useSelector(
  //   (state) => state.authStore
  // );

   const { onboardingComplete, loading } = useSelector(
    (state) => state.goHomesliceHandlerStore
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { identity: "", password: "" },
    mode: "onSubmit",
  });

const onSubmit = async ({ identity, password }) => {
  try {
    dispatch(setLoading(true));

    const userCredential = await signInWithEmailAndPassword(
      auth,
      identity.trim(),
      password
    );

    const user = userCredential.user;
    const docId = `${user.email}_${user.uid}`;

    // 🔹 Get usersList data (optional, if you need it)
    const userRef = doc(db, "usersList", docId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    // 🔹 Get the onboarding/profile data
    const profileRef = doc(db, "users", docId, "profileData", "profile");
    const profileSnap = await getDoc(profileRef);
    const profileData = profileSnap.data();

    // 🔹 Check onboarding status safely
    const hasPreferences = Array.isArray(profileData?.preferences) && profileData.preferences.length > 0;
    const onboardingComplete = profileData?.onboardingComplete;

    if (!onboardingComplete ) {
      navigation.replace("prefer-list");
    } else {
      navigation.replace("home");
    }
  } catch (error) {
    console.log("Error Code:", error.code);
    console.log("Error Message:", error.message);

    if (error.code === "auth/invalid-credential") {
      Alert.alert("Login Failed", "Invalid email or password.");
    } else {
      Alert.alert("Login Error", error.message);
    }
  } finally {
    dispatch(setLoading(false));
  }
};





  return (
    <View>
      <Controller
        control={control}
        name="identity"
        rules={{ required: "Required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={COLORS.greyishy}
            value={value}
            onChangeText={onChange}
          />
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
              style={[styles.input, { flex: 1, borderWidth: 0 }]}
              placeholder="Password"
              placeholderTextColor={COLORS.greyishy}
              secureTextEntry={!showPassword}
              value={value}
              onChangeText={onChange}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)} style={{ marginRight: 12 }}>
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#999" />
            </Pressable>
          </View>
        )}
      />
      {errors.password && <Text style={[styles.error, { color: COLORS.red }]}>{errors.password.message}</Text>}

      <PressableIconButtonGradient ButtonTitle={loading ? "Please wait..." : "Log In"} onPress={handleSubmit(onSubmit)} />
    </View>
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
    fontFamily: "Urbanist_600SemiBold",
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
    fontFamily: "Urbanist_600SemiBold",
  },
});
