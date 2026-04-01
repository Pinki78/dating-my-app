import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";
import React, { useState, useEffect } from "react";
WebBrowser.maybeCompleteAuthSession();

export function useGoogleLogin() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "629139675058-4i2h53rvhpdr2ldgta5soh8qem9hboa3.apps.googleusercontent.com",
    androidClientId: "com.alankita.DatingApp",
    webClientId:     "228503549492-ljpes2b81hvmjvpp0e3mab9s5fr1j5ed.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.authentication;

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return { promptAsync };
}
