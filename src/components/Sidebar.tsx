import React from "react";
import "./Sidebar.css";

import SidebarContent from "./SidebarContent";

export default function Sidebar() {
  return (
    <div id="sidebar">
      <SidebarContent path="/" name="Home" />
      <SidebarContent path="line" name="Lines" />
      <SidebarContent path="circle" name="Circles" />
      <SidebarContent path="ellipse" name="Ellipses" />
      <SidebarContent path="transformation" name="Transformations" />
      <SidebarContent path="3d" name="3D" />
    </div>
  );
}
