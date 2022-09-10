import Modal from "react-bootstrap/Modal";
import PlaylistModalCard from "../PlaylistModalCard/PlaylistModalCard";
import "./PlaylistModal.scss";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PlaylistsModal(props) {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    axios
      .get("/playlist/all")
      .then((res) => {
        setPlaylists(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setPlaylists]);

  const playlistItems = playlists.map((playlist, key) => {
    const args = {
      categoryid: props.categoryid,
      id: playlist.id,
      title: playlist.name,
      description: playlist.description,
      image:
        playlist.images.length > 0
          ? playlist.images[0].url
          : "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999",
    };
    return <PlaylistModalCard className="playlistItem" key={key} {...args} />;
  });

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <h3>All Playlists</h3>
      </Modal.Header>
      <Modal.Body>
        <div className="playlists">{playlistItems}</div>
      </Modal.Body>
    </Modal>
  );
}
