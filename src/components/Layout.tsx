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
        <Sidebar />
        <div id="layoutContent">
          <Menubar LogoutHandler={props.LogoutHandler} />
          <Outlet />
        </div>
      </FirestoreContext.Provider>
    </div>
  );
}
