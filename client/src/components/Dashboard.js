import React from "react";
import "../styles/dashboard.scss";
import { Col, Container, Row } from "react-bootstrap";
import Navbar from "./Navbar/Navbar";
import Header from "./Header/Header";
import CategoryCard from "./CategoryCard/CategoryCard";
import AddCircleIcon from "@material-ui/icons/AddCircle";

export default function Dashboard() {
  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Header />
        <div className="categoriesTitle">
          <h1>Categories</h1>
          <AddCircleIcon className="addIcon" />
        </div>
        <div className="categories">
          <CategoryCard className="categoryItem" />
          <CategoryCard className="categoryItem" />
          <CategoryCard className="categoryItem" />
          <CategoryCard className="categoryItem" />
          <CategoryCard className="categoryItem" />
          <CategoryCard className="categoryItem" />
        </div>
      </div>
    </div>
  );
}
