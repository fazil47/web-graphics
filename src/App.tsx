import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Firebase
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  EmailAuthProvider,
  Auth,
} from "firebase/auth";
import {
  initializeFirebaseApp,
  getFirebaseAuth,
  FirebaseAppContext,
  FirebaseAuthContext,
} from "./utils/firebase/FirebaseUtils";

// Custom Components
import Layout from "./components/Layout";

// Pages
import Home from "./components/pages/Home";
import Lines from "./components/pages/Lines";
import Circles from "./components/pages/Circles";
import Ellipses from "./components/pages/Ellipses";
import Transformations from "./components/pages/Transformations";
import ThreeD from "./components/pages/ThreeD";
import { FirebaseApp } from "firebase/app";

// TODO: Use custom authentication components
function App(): JSX.Element {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const [isAuthenticating, setIsAuthenticating] = useState(true); // Firebase signing-in progress state.
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp>(); // Firebase app instance.
  const [firebaseAuth, setFirebaseAuth] = useState<Auth>(); // Firebase auth object.

  // Configure FirebaseUI.
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

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const firebaseApp = initializeFirebaseApp();
    const firebaseAuth = getFirebaseAuth(firebaseApp);
    setFirebaseApp(firebaseApp);
    setFirebaseAuth(firebaseAuth);

    setIsAuthenticating(true);
    const unregisterAuthObserver = onAuthStateChanged(firebaseAuth, (user) => {
      setIsSignedIn(!!user);
      setIsAuthenticating(false);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  async function LogoutHandler() {
    await signOut(firebaseAuth as Auth);
  }

  if (isAuthenticating) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  } else if (!isSignedIn) {
    return (
      <div>
        <h1>Computer Graphics Learning Platform</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
      </div>
    );
  }

  return (
    <div className="App">
      <FirebaseAppContext.Provider value={firebaseApp as FirebaseApp}>
        <FirebaseAuthContext.Provider value={firebaseAuth as Auth}>
          <Routes>
            <Route path="/" element={<Layout LogoutHandler={LogoutHandler} />}>
              <Route index element={<Home />} />
              <Route path="line" element={<Lines />} />
              <Route path="circle" element={<Circles />} />
              <Route path="ellipse" element={<Ellipses />} />
              <Route path="transformation" element={<Transformations />} />
              <Route path="3d" element={<ThreeD />} />
            </Route>
          </Routes>
        </FirebaseAuthContext.Provider>
      </FirebaseAppContext.Provider>
    </div>
  );
}

export default App;
