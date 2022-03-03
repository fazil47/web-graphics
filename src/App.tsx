import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Firebase
import { FirebaseApp } from "firebase/app";
import { onAuthStateChanged, signOut, Auth } from "firebase/auth";
import {
  initializeFirebaseApp,
  getFirebaseAuth,
  FirebaseAppContext,
  FirebaseAuthContext,
} from "./utils/firebase/FirebaseUtils";

// Custom Components
import Layout from "./components/Layout";
import Authentication from "./components/Authentication";
import LoadingIndicator from "./components/LoadingIndicator";

// Pages
import Home from "./components/pages/Home";
import ShadingModels from "./components/pages/ShadingModels/ShadingModels";

function App(): JSX.Element {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const [isAuthenticating, setIsAuthenticating] = useState(true); // Firebase signing-in progress state.
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp>(); // Firebase app instance.
  const [firebaseAuth, setFirebaseAuth] = useState<Auth>(); // Firebase auth object.

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

  async function logoutHandler() {
    if (firebaseAuth) {
      await signOut(firebaseAuth);
    }
  }

  if (isAuthenticating) {
    return <LoadingIndicator />;
  }
  // TODO: Use a better error component
  if (!firebaseApp || !firebaseAuth) {
    return (
      <div className="App">
        <p>Firebase Error</p>
      </div>
    );
  }

  // TODO: Use custom authentication components
  if (!isSignedIn) {
    return (
      <FirebaseAuthContext.Provider value={firebaseAuth}>
        <Authentication />
      </FirebaseAuthContext.Provider>
    );
  }

  return (
    <div className="App">
      <FirebaseAppContext.Provider value={firebaseApp}>
        <FirebaseAuthContext.Provider value={firebaseAuth}>
          <Routes>
            <Route path="/" element={<Layout logoutHandler={logoutHandler} />}>
              <Route index element={<Home />} />
              <Route path="shading_models" element={<ShadingModels />} />
            </Route>
          </Routes>
        </FirebaseAuthContext.Provider>
      </FirebaseAppContext.Provider>
    </div>
  );
}

export default App;
