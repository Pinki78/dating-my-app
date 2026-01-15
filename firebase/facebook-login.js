import * as Facebook from "expo-auth-session/providers/facebook";
import { FacebookAuthProvider, signInWithCredential } from "firebase/auth";
import React, { useState, useEffect } from "react";

export function useFacebookLogin(navigation) {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "YOUR_FACEBOOK_APP_ID",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.authentication;
      const credential = FacebookAuthProvider.credential(access_token);

      signInWithCredential(auth, credential).then(() => {
        navigation.replace("log-in");
      });
    }
  }, [response]);

  return { promptAsync };
}
