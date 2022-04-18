import React from "react";
import "./Authentication.css";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { GoogleAuthProvider, EmailAuthProvider, Auth } from "firebase/auth";

export default function Authentication({
  firebaseAuth,
  cancelAuthentication,
}: {
  firebaseAuth: Auth;
  cancelAuthentication: () => void;
}) {
  // const firebaseAuth = React.useContext(FirebaseAuthContext);

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
      <h1 id="authHeading">3D Computer Graphics Learning Platform</h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
      <button id="cancelButton" onClick={cancelAuthentication}>
        Cancel
      </button>
    </div>
  );
}
