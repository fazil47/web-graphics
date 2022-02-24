import React from "react";

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
    <div>
      <h1>Computer Graphics Learning Platform</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
    </div>
  );
}
