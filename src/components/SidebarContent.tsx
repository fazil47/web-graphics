import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./SidebarContent.css";

export default function SidebarContent(props: any) {
  const location = useLocation();
  const isSelected = location.pathname.slice(1) === props.path;
  const sidebarContentClassName = isSelected
    ? "sidebarContent sidebarContentSelected"
    : "sidebarContent";
  return (
    <Link className={sidebarContentClassName} to={props.path}>
      {props.name}
    </Link>
  );
}
