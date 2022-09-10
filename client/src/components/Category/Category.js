import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from "react-bootstrap/Button";
import PlaylistCard from "../PlaylistCard/PlaylistCard";
import PlaylistsModal from "../PlaylistsModal/PlaylistsModal";
import "./Category.scss";
import { useParams } from "react-router-dom";
import axios from "axios";

const args = {
  title: "Chill Vibes Playlist",
  description: "A cool playlist for just vibing and jamming out",
  totalTracks: 21,
  image:
    "https://www.liveabout.com/thmb/pwO4o_iDrZRTmmhs7eOfD25Qoqw=/1500x1125/smart/filters:no_upscale()/pop-music-57bce3863df78c87634ea806.jpg",
};

export default function Category() {
  let { id } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get(`/category/${id}`).then((res) => {
      console.log(res.data);
      setCategory(res.data);
    });
  }, [id, setCategory]);

  const playlistItems = category.map((item, key) => {
    const args = {
      title: item.playlist_name,
      description: item.playlist_desc,
      totalTracks: item.total_tracks,
      image: item.playlist_img,
    };
    return <PlaylistCard key={key} className="playlistItem" {...args} />;
  });

  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Header />
        <div className="categoryHeader">
          <img id="categoryImage" src={category[0] && category[0].category_img} alt="category" />
          <div className="categoryInfo">
            <h1 id="categoryTitle">{category[0] && category[0].category_name}</h1>
            <p id="categoryDescription">{category[0] && category[0].category_desc}</p>
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
          <AddCircleIcon className="addIcon" onClick={() => setModalShow(true)} />
        </div>
        <PlaylistsModal show={modalShow} onHide={() => setModalShow(false)} />
        <div className="playlists">
          {playlistItems}
          {/*           
          <PlaylistCard className="playlistItem" {...args} />
          <PlaylistCard className="playlistItem" {...args} />
          <PlaylistCard className="playlistItem" {...args} />
          <PlaylistCard className="playlistItem" {...args} />
          <PlaylistCard className="playlistItem" {...args} />
          <PlaylistCard className="playlistItem" {...args} /> */}
        </div>
      </div>
    </div>
  );
}
