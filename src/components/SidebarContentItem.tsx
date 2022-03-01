import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./SidebarContentItem.css";

export default function SidebarContentItem(props: any) {
  const location = useLocation();
  const isSelected = location.pathname.slice(1) === props.path;
  const sidebarContentClassName = isSelected
    ? "sidebarContentItem sidebarContentSelected"
    : "sidebarContentItem";
  return (
    <Link className={sidebarContentClassName} to={props.path}>
      {props.name}
    </Link>
  );
}
