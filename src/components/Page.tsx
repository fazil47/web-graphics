import React from "react";
import "./Page.css";

export default function Page(props: any) {
  return <div id="page">{props.children}</div>;
}
