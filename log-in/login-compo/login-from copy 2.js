import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState,  useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch , useSelector } from "react-redux";

import COLORS from "../../assets/style/color";
import PressableIconButtonGradient from "../../components/button/pressable-gradient-icon-button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { setLoading } from "../../react-redux-store/store-comp/authSlice";

const LoginFrom = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  // const [loading, setLoading] = useState(false);
  const { loading } = useSelector(
    (state) => state.authStore
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { identity: "", password: "" },
    mode: "onSubmit",
  });

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const docId = `${user.email}_${user.uid}`;
      const userRef = doc(db, "usersList", docId);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();

      navigation.replace(
        isOnboardingComplete(userData) ? "home" : "prefer-list"
      );
    }
  });

  return () => unsubscribe();
}, []);

 function isOnboardingComplete(userData) {
  const hasPreferences =
    Array.isArray(userData?.preferences) && userData.preferences.length > 0;

  const hasInterests =
    Array.isArray(userData?.interests) && userData.interests.length > 0;

  const hasLocation =
    userData?.location &&
    typeof userData.location.region === "string" &&
    typeof userData.location.address === "string";

  const hasPhotos =
    Array.isArray(userData?.photos) && userData.photos.length > 0;

  return hasPreferences && hasInterests && hasLocation && hasPhotos;
}

async function onSubmit({ identity, password }) {
  try {
    dispatch(setLoading(true));

    const userCredential = await signInWithEmailAndPassword(
      auth,
      identity.trim(),
      password
    );
    const user = userCredential.user;

    const docId = `${user.email}_${user.uid}`;
    const userRef = doc(db, "usersList", docId);
    const userSnap = await getDoc(userRef);
  const userData = userSnap.exists() ? userSnap.data() : {};

    if (isOnboardingComplete(userData)) {
      // ✅ All data exists, go to home
      navigation.replace("home");
    } else {
      // 🚀 Missing data, go to onboarding
      navigation.replace("prefer-list");
    }
  } catch (error) {
    console.log("Login Error:", error);
    Alert.alert("Login Error", error.message);
  } finally {
    dispatch(setLoading(false));
  }
}





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
