import React from "react";
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import "../styles/dashboard.scss";
import CategoryCard from "./CategoryCard/CategoryCard";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const args = {
  title: "Long drive",
  description: "A fun collection of playlists for a nice ride",
  totalPlaylists: 8,
  image:
    "https://www.liveabout.com/thmb/pwO4o_iDrZRTmmhs7eOfD25Qoqw=/1500x1125/smart/filters:no_upscale()/pop-music-57bce3863df78c87634ea806.jpg",
};

export default function Dashboard() {
  const onClick = ( )=> {
    fetch("/playlist/create", {
      method: "POST",
      body: JSON.stringify({
        name: "abcd",
        description: "abcde"
      }),
      headers: {
        "content-type": "application/json",
      },
    })
  }
  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <button onClick={onClick}>Create playlist</button>
      <div className="content">
        <Header />
        <div className="categoriesTitle">
          <h1>Categories</h1>
          <AddCircleIcon className="addIcon" />
        </div>
        <div className="categories">
          <CategoryCard className="categoryItem" {...args} />
          <CategoryCard className="categoryItem" {...args} />
          <CategoryCard className="categoryItem" {...args} />
          <CategoryCard className="categoryItem" {...args} />
          <CategoryCard className="categoryItem" {...args} />
          <CategoryCard className="categoryItem" {...args} />
          <CategoryCard className="categoryItem" {...args} />
          <CategoryCard className="categoryItem" {...args} />
        </div>
      </div>
    </div>
  );
}
