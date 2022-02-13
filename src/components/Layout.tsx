import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout(props: any) {
  return (
    <div id="layout">
      <Navbar LogoutHandler={props.LogoutHandler} />
      <div id="layout-horiz-content">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
