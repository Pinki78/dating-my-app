import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { FacebookAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./firebase";

WebBrowser.maybeCompleteAuthSession();

export function useFacebookLogin(navigation) {
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,   // 🔥 REQUIRED FOR EXPO GO
  });

  // console.log("Redirect URI:", redirectUri);

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "901481222379253",
    redirectUri,
    responseType: "token",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.authentication;

      const credential =
        FacebookAuthProvider.credential(access_token);

      signInWithCredential(auth, credential)
        .then(() => navigation.replace("log-in"))
        .catch((err) => console.log("Firebase error:", err));
    }
  }, [response]);

  return {
    facebookLogin: () => promptAsync({ useProxy: true }),
  };
}