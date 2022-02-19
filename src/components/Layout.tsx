import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Firestore } from "firebase/firestore";
import "./Layout.css";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import {
  FirebaseAppContext,
  FirestoreContext,
  getFirestoreObject,
} from "../utils/firebase/FirebaseUtils";

export default function Layout(props: any) {
  const [firestore, setFirestore] = useState<Firestore>();

  const firebaseApp = useContext(FirebaseAppContext);

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
        <Navbar LogoutHandler={props.LogoutHandler} />
        <div id="layout-horiz-content">
          <Sidebar />
          <Outlet />
        </div>
      </FirestoreContext.Provider>
    </div>
  );
}
