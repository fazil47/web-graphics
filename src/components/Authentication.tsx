import React from "react";
import "./Authentication.css";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";
import { FirebaseAuthContext } from "../utils/firebase/FirebaseUtils";

export default function Authentication() {
  const firebaseAuth = React.useContext(FirebaseAuthContext);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      GoogleAuthProvider.PROVIDER_ID,
      EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  return (
    <div id="authDiv">
      <h1 id="authHeading">Computer Graphics Learning Platform</h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
    </div>
  );
}
