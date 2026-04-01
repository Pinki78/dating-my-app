import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import { useEffect } from "react";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleLogin() {
  const redirectUri = AuthSession.makeRedirectUri({
    scheme: "datingapp", // from your app config
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
      androidClientId:
    "228503549492-pctucem1afhcnti3kndon1bdk0itpl3n.apps.googleusercontent.com",
    webClientId:
      "228503549492-ljpes2b81hvmjvpp0e3mab9s5fr1j5ed.apps.googleusercontent.com",
    redirectUri,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.authentication;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then(() => console.log("Google Login Success"))
        .catch((error) => console.log("Firebase Error:", error));
    }
  }, [response]);

  return { promptAsync };
}