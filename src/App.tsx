import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Firebase
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  EmailAuthProvider,
} from "firebase/auth";
import { InitializeFirebaseApp } from "./utils/firebase/FirebaseUtils";

// Custom Components
import Layout from "./components/Layout";

// Pages
import Home from "./components/pages/Home";
import Lines from "./components/pages/Lines";
import Circles from "./components/pages/Circles";
import Ellipses from "./components/pages/Ellipses";
import Transformations from "./components/pages/Transformations";
import ThreeD from "./components/pages/ThreeD";

// TODO: Move Firebase stuff to a different component and use custom authentication components
// TODO: Use Redux to hold Firebase objects
function App() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const [isAuthenticating, setIsAuthenticating] = useState(true); // Firebase signing-in progress state.

  const firebaseApp = InitializeFirebaseApp();
  const firebaseAuth = getAuth(firebaseApp);

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
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
    setIsAuthenticating(true);
    const unregisterAuthObserver = onAuthStateChanged(firebaseAuth, (user) => {
      setIsSignedIn(!!user);
      setIsAuthenticating(false);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function LogoutHandler() {
    await signOut(firebaseAuth);
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
    </div>
  );
}

export default App;
