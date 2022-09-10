import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import "../styles/dashboard.scss";
import CategoryCard from "./CategoryCard/CategoryCard";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    axios.get("/category").then((res) => {
      setCategoryList(res.data);
    });
  }, []);

  const usersCategories = categoryList.map((category) => {
    return (
      <CategoryCard
        key={category.id}
        image={category.image}
        description={category.description}
        title={category.name}
        totalPlaylists={category.count}
      />
    );
  });

  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>

      <div className="content">
        <Header />
        <div className="categoriesTitle">
          <h1>Categories</h1>
          <Link to="/createcategory">
            <AddCircleIcon className="addIcon" href="/createcategory" />
          </Link>
        </div>
        <div className="categories">{usersCategories}</div>
      </div>
    </div>
  );
}
