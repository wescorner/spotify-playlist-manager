import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import { NavbarData } from "./NavbarData";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    axios.get("/category").then((res) => {
      setCategoryList(res.data);
    });
  }, []);

  const usersCategories = categoryList.map((category) => {
    return {
      key: category.id,
      image: category.image,
      description: category.description,
      title: category.name,
      totalPlaylists: category.count,
      link: "/category/" + category.id,
    };
  });

  return (
    <div className="navbar">
      <ul className="navbarList">
        {NavbarData.map((val, key) => {
          return (
            <li className="navrow" key={key}>
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
        {usersCategories.map((c) => {
          return (
            <li key={c.key}>
              <Link to={c.link}>{c.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
