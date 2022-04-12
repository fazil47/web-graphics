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
import Modeling from "./components/pages/Modeling/Modeling";
import Projection from "./components/pages/Projection/Projection";
import Transformations from "./components/pages/Transformations/Transformations";
import ShadingModels from "./components/pages/ShadingModels/ShadingModels";
import Textures from "./components/pages/Textures/Textures";
import Shaders from "./components/pages/Shaders/Shaders";
import Misc from "./components/pages/Misc/Misc";
import Illumination from "./components/pages/Illumination/Illumination";

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
              <Route path="transformations" element={<Transformations />} />
              <Route path="shadingModels" element={<ShadingModels />} />
              <Route path="illumination" element={<Illumination />} />
              <Route path="textures" element={<Textures />} />
              <Route path="shaders" element={<Shaders />} />
              <Route path="misc" element={<Misc />} />
            </Route>
          </Routes>
        </FirebaseAuthContext.Provider>
      </FirebaseAppContext.Provider>
    </div>
  );
}

export default App;
