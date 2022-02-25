import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Firebase
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

// Pages
import Home from "./components/pages/Home";
import Lines from "./components/pages/Lines";
import Circles from "./components/pages/Circles";
import Ellipses from "./components/pages/Ellipses";
import Transformations from "./components/pages/Transformations";
import ThreeD from "./components/pages/ThreeD";
import { FirebaseApp } from "firebase/app";
import ShadingModels from "./components/pages/ShadingModels";

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

  async function LogoutHandler() {
    if (firebaseAuth) {
      await signOut(firebaseAuth);
    }
  }

  // TODO: Use a better loading component
  if (isAuthenticating) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
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
            <Route path="/" element={<Layout LogoutHandler={LogoutHandler} />}>
              <Route index element={<Home />} />
              <Route path="lines" element={<Lines />} />
              <Route path="circles" element={<Circles />} />
              <Route path="ellipses" element={<Ellipses />} />
              <Route path="transformations" element={<Transformations />} />
              <Route path="3d" element={<ThreeD />} />
              <Route path="shading_models" element={<ShadingModels />} />
            </Route>
          </Routes>
        </FirebaseAuthContext.Provider>
      </FirebaseAppContext.Provider>
    </div>
  );
}

export default App;
