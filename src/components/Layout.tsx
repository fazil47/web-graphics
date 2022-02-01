import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";

import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div id="layout">
      <Sidebar />
      <Outlet />
    </div>
  );
}
