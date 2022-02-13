import React from "react";

export default function Navbar(props: any) {
  return (
    <div id="navbar">
      <button onClick={props.LogoutHandler}>Logout</button>
    </div>
  );
}
