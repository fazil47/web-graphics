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
import Placeholder from "./components/pages/Placeholder";
import Projection from "./components/pages/Projection";
import Modeling from "./components/pages/Modeling/Modeling";

function App(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Local signed-in state.
  const [isAuthenticating, setIsAuthenticating] = useState(true); // Firebase signing-in progress state.
  const [showAuthPage, setShowAuthPage] = useState(false); // Show the authentication page.
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp | null>(null); // Firebase app instance.
  const [firebaseAuth, setFirebaseAuth] = useState<Auth | null>(null); // Firebase auth object.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const firebaseApp = initializeFirebaseApp();
    const firebaseAuth = getFirebaseAuth(firebaseApp);
    setFirebaseApp(firebaseApp);
    setFirebaseAuth(firebaseAuth);

    if (firebaseAuth) {
      setIsAuthenticating(true);
      const unregisterAuthObserver = onAuthStateChanged(
        firebaseAuth,
        (user) => {
          setIsAuthenticated(!!user);
          setIsAuthenticating(false);
        }
      );
      return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    } else {
      setIsAuthenticating(false);
      setIsAuthenticated(false);
    }
  }, []);

  async function logoutHandler() {
    if (firebaseAuth) {
      await signOut(firebaseAuth);
      // setShowAuthPage(true);
    }
  }

  if (isAuthenticating) {
    return <LoadingIndicator />;
  }

  if (!isAuthenticated && firebaseAuth && showAuthPage) {
    return <Authentication firebaseAuth={firebaseAuth} />;
  }

  return (
    <div className="App">
      <FirebaseAppContext.Provider value={firebaseApp}>
        <FirebaseAuthContext.Provider value={firebaseAuth}>
          <Routes>
            <Route
              path="/"
              element={
                <Layout
                  logoutHandler={logoutHandler}
                  showAuthPage={() => {
                    setShowAuthPage(true);
                  }}
                  isAuthenticated={isAuthenticated}
                />
              }
            >
              <Route index element={<Home />} />
              <Route path="modeling" element={<Modeling />} />
              <Route path="projection" element={<Projection />} />
              <Route path="shading_models" element={<ShadingModels />} />
              <Route path="placeholder" element={<Placeholder />} />
            </Route>
          </Routes>
        </FirebaseAuthContext.Provider>
      </FirebaseAppContext.Provider>
    </div>
  );
}

export default App;
