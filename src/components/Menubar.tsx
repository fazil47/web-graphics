import React from "react";
import "./Menubar.css";

export default function Menubar(props: any) {
  return (
    <div id="menubar">
      <button onClick={props.LogoutHandler}>Logout</button>
    </div>
  );
}
