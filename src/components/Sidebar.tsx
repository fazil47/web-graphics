import React from "react";
import "./Sidebar.css";

import SidebarContent from "./SidebarContent";

export default function Sidebar() {
  return (
    <div id="sidebar">
      <SidebarContent path="" name="Home" />
      <SidebarContent path="lines" name="Lines" />
      <SidebarContent path="circles" name="Circles" />
      <SidebarContent path="ellipses" name="Ellipses" />
      <SidebarContent path="transformations" name="Transformations" />
      <SidebarContent path="3d" name="3D" />
      <SidebarContent path="shading_models" name="Shading Models" />
    </div>
  );
}
