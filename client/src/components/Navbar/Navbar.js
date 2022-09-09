import React from "react";
import "./Navbar.scss";
import { NavbarData } from "./NavbarData";
import { CategoriesData } from "./CategoriesData";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <ul className="navbarList">
        {NavbarData.map((val, key) => {
          return (
            <li className="navrow" key={key} onClick={() => console.log("click")}>
              <Link to={val.link} id="icon">
                {val.icon}
              </Link>
              <Link to={val.link} id="navtitle">
                {val.title}
              </Link>
            </li>
          );
        })}
      </ul>
      <hr />
      <ul className="categoriesList">
        {CategoriesData.map((val, key) => {
          return <li key={key}>{val.name}</li>;
        })}
      </ul>
    </div>
  );
}
