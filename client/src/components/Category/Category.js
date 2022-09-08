import React from "react";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from "react-bootstrap/Button";
import PlaylistCard from "../PlaylistCard/PlaylistCard";
import "./Category.scss";

const args = {
  title: "Chill Vibes Playlist",
  description: "A cool playlist for just vibing and jamming out",
  totalTracks: 21,
  image:
    "https://www.liveabout.com/thmb/pwO4o_iDrZRTmmhs7eOfD25Qoqw=/1500x1125/smart/filters:no_upscale()/pop-music-57bce3863df78c87634ea806.jpg",
};

export default function Category() {
  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Header />
        <div className="categoryHeader">
          <img
            id="categoryImage"
            src="https://www.liveabout.com/thmb/pwO4o_iDrZRTmmhs7eOfD25Qoqw=/1500x1125/smart/filters:no_upscale()/pop-music-57bce3863df78c87634ea806.jpg"
            alt="category"
          />
          <div className="categoryInfo">
            <h1 id="categoryTitle">Category Title</h1>
            <p id="categoryDescription">
              This is the description of this category This is the description of this category This
              is the description of this category
            </p>
            <p id="categoryPlaylists">Number of Playlists</p>
            <div id="categoryButtons">
              <Button id="edit" variant="edit">
                Edit
              </Button>
              <Button id="edit" variant="delete">
                Delete
              </Button>
            </div>
          </div>
        </div>
        <hr className="mainDivider" />
        <div className="categoriesTitle">
          <h1>Playlists</h1>
          <AddCircleIcon className="addIcon" />
        </div>
        <div className="playlists">
          <PlaylistCard className="playlistItem" {...args} />
          <PlaylistCard className="playlistItem" {...args} />
          <PlaylistCard className="playlistItem" {...args} />
          <PlaylistCard className="playlistItem" {...args} />
          <PlaylistCard className="playlistItem" {...args} />
          <PlaylistCard className="playlistItem" {...args} />
        </div>
      </div>
    </div>
  );
}
