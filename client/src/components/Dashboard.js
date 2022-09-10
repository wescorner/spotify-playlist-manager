import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import "../styles/dashboard.scss";
import CategoryCard from "./CategoryCard/CategoryCard";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [categoryList, setCategoryList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/category").then((res) => {
      setCategoryList(res.data);
    });
  }, []);

  const usersCategories = categoryList.map((category) => {
    return (
      <CategoryCard
        key={category.id}
        image={
          category.image
            ? category.image
            : "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999"
        }
        description={category.description}
        title={category.name}
        totalPlaylists={category.count}
        onClick={() => navigate(`/category-page/${category.id}`)}
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
