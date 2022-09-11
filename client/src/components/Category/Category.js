import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from "react-bootstrap/Button";
import PlaylistCard from "../PlaylistCard/PlaylistCard";
import PlaylistsModal from "../PlaylistsModal/PlaylistsModal";
import "./Category.scss";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import EditCategoryModal from "../EditCategoryModal/EditCategoryModal";

export default function Category() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [playlistModalShow, setPlaylistModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [category, setCategory] = useState([]);
  const [, setUpdate] = useState();

  useEffect(() => {
    axios.get(`/category/${id}`).then((res) => {
      setCategory(res.data);
    });
  }, [id, setCategory, playlistModalShow]);

  const onDelete = () => {
    axios.delete(`/category/${id}`).then(() => navigate("/dashboard"));
  };

  const forceUpdate = useCallback(() => setUpdate({}));

  const playlistItems = category.map((item, key) => {
    const args = {
      id: item.playlist_id,
      categoryid: id,
      title: item.playlist_name,
      description: item.playlist_desc,
      totalTracks: item.total_tracks,
      image: item.playlist_img
        ? item.playlist_img
        : "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999",
    };
    if (item.playlist_name) {
      return <PlaylistCard key={key} className="playlistItem" {...args} />;
    } else {
      return "";
    }
  });

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
            src={
              category[0] && category[0].category_img
                ? category[0].category_img
                : "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999"
            }
            alt="category"
          />
          <div className="categoryInfo">
            <h1 id="categoryTitle">{category[0] && category[0].category_name}</h1>
            <p id="categoryDescription">{category[0] && category[0].category_desc}</p>
            <div id="categoryButtons">
              <Button id="edit" variant="edit" onClick={() => setEditModalShow(true)}>
                Edit
              </Button>
              <Button id="edit" variant="delete" onClick={onDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
        <EditCategoryModal
          categoryid={id}
          name={category[0] && category[0].category_name}
          description={category[0] && category[0].category_desc}
          image={category[0] && category[0].category_img}
          show={editModalShow}
          onHide={() => {
            setEditModalShow(false);
          }}
        />
        <hr className="mainDivider" />
        <div className="categoriesTitle">
          <h1>Playlists</h1>
          <AddCircleIcon className="addIcon" onClick={() => setPlaylistModalShow(true)} />
        </div>
        <PlaylistsModal
          categoryid={id}
          show={playlistModalShow}
          onHide={() => {
            forceUpdate();
            setPlaylistModalShow(false);
          }}
        />
        <div className="playlists">{playlistItems}</div>
      </div>
    </div>
  );
}
