import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import "../styles/dashboard.scss";
import CategoryCard from "./CategoryCard/CategoryCard";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Link } from "react-router-dom";
import axios from "axios";

const args = {
  title: "Long drive",
  description: "A fun collection of playlists for a nice ride",
  totalPlaylists: 8,
  image:
    "https://www.liveabout.com/thmb/pwO4o_iDrZRTmmhs7eOfD25Qoqw=/1500x1125/smart/filters:no_upscale()/pop-music-57bce3863df78c87634ea806.jpg",
};

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
