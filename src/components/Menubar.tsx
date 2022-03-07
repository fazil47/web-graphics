import { useContext } from "react";
import "./Menubar.css";

import NavigationButton from "./buttons/NavigationButton";
import { FirebaseAppContext } from "../utils/firebase/FirebaseUtils";

export default function Menubar({
  logoutHandler,
  isSidebarOpen,
  setSidebarOpen,
  showAuthPage,
  isAuthenticated,
}: {
  logoutHandler: () => Promise<void>;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  showAuthPage: () => void;
  isAuthenticated: boolean;
}) {
  const firebaseApp = useContext(FirebaseAppContext);
  const rightMenuItems = isAuthenticated ? (
    <button onClick={logoutHandler}>Logout</button>
  ) : (
    <button onClick={showAuthPage}>Login</button>
  );

  return (
    <div id="menubar">
      <div id="leftMenuItems">
        <NavigationButton isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      </div>
      <div id="rightMenuItems">{firebaseApp ? rightMenuItems : null}</div>
    </div>
  );
}
