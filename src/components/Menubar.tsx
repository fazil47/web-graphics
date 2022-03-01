import React from "react";
import "./Menubar.css";

import NavigationButton from "./buttons/NavigationButton";

export default function Menubar({
  logoutHandler,
  isSidebarOpen,
  setSidebarOpen,
}: {
  logoutHandler: () => Promise<void>;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}) {
  return (
    <div id="menubar">
      <div id="leftMenuItems">
        <NavigationButton isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      </div>
      <div id="rightMenuItems">
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  );
}
