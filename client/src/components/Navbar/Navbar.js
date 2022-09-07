import React from "react";
import "./Navbar.scss";
import Nav from "react-bootstrap/Nav";
import { NavbarData } from "./NavbarData";

export default function Navbar() {
  return (
    <div className="navbar">
      <ul className="navbarList">
        {NavbarData.map((val, key) => {
          return (
            <li className="navrow" key={key} onClick={() => console.log("click")}>
              <div id="icon">{val.icon}</div>
              <div id="navtitle">{val.title}</div>
            </li>
          );
        })}
      </ul>
      <hr />
      <p>test</p>
    </div>
  );
}
