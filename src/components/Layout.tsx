import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Firestore } from "firebase/firestore";
import "./Layout.css";

import Sidebar from "./Sidebar";
import Menubar from "./Menubar";

import {
  FirebaseAppContext,
  FirestoreContext,
  getFirestoreObject,
} from "../utils/firebase/FirebaseUtils";

export default function Layout({
  logoutHandler,
}: {
  logoutHandler: () => Promise<void>;
}) {
  const [firestore, setFirestore] = useState<Firestore>();

  const firebaseApp = useContext(FirebaseAppContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // To update three.js canvas elements size
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [isSidebarOpen]);

  useEffect(() => {
    const firestore = getFirestoreObject(firebaseApp);
    if (firestore) {
      setFirestore(firestore);
    }
  }, [firebaseApp]);

  // TODO: Use a better error component
  if (!firestore) {
    return <div>Firestore error</div>;
  }

  return (
    <div id="layout">
      <FirestoreContext.Provider value={firestore}>
        <Sidebar
          isOpen={isSidebarOpen}
          closeSidebar={() => {
            setIsSidebarOpen(false);
          }}
        />
        <div id="layoutContent">
          <Menubar
            logoutHandler={logoutHandler}
            isSidebarOpen={isSidebarOpen}
            setSidebarOpen={setIsSidebarOpen}
          />
          <Outlet />
        </div>
      </FirestoreContext.Provider>
    </div>
  );
}
