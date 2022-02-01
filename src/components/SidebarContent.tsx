import React from "react";
import { Link } from "react-router-dom";
import "./SidebarContent.css";

export default function SidebarContent(props: any) {
  return (
    <div className="sidebarContent">
      <Link to={props.path}>{props.name}</Link>
    </div>
  );
}
