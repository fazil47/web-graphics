import React from "react";
import "./Sidebar.css";

import SidebarContentItem from "./SidebarContentItem";
import CloseButton from "./buttons/CloseButton";

export default function Sidebar({
  isOpen,
  closeSidebar,
}: {
  isOpen: boolean;
  closeSidebar: () => void;
}) {
  const className = isOpen ? "" : "closedSidebar";
  return (
    <div id="sidebar" className={className}>
      <div id="sidebarHeader">
        <CloseButton setClose={closeSidebar} />
      </div>
      <div id="sidebarContent">
        <SidebarContentItem path="" name="Home" />
        <SidebarContentItem path="shading_models" name="Shading Models" />
        <SidebarContentItem path="placeholder" name="Placeholder" />
        <SidebarContentItem path="projection" name="Projection" />
      </div>
    </div>
  );
}
