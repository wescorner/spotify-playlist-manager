import { useState } from "react";
import Search from "../Search/Search";
import Tracks from "../Tracks/Tracks";
import { Modal, Table } from "react-bootstrap";

export default function AddTracks({ show, onHide, playlistId }) {
  const [tracks, setTracks] = useState([]);

  const onSearch = (search) => {
    fetch(`${process.env.REACT_APP_BACKEND}/playlist/search`, {
      method: "POST",
      body: JSON.stringify({
        searchQuery: search,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTracks(data);
      });
  };

  const onAdd = (track) => {
    fetch(`${process.env.REACT_APP_BACKEND}/playlist/track`, {
      method: "POST",
      body: JSON.stringify({
        playlistId,
        track,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
  };

  const showSearchResult = tracks.map((track, index) => {
    return (
      <Tracks
        key={index}
        image={track.image}
        name={track.name}
        album={track.artist}
        showAdd={true}
        url={track.uri}
        onAdd={onAdd}
      />
    );
  });

  return (
    <Modal show={show} onHide={onHide} fullscreen={true} centered>
      <Modal.Header closeButton>
        <h3>Add Tracks</h3>
      </Modal.Header>
      <Modal.Body>
        <Search onSearch={onSearch} />
        <Table style={{ overflowY: "true", color: "white" }}>
          <tbody>{showSearchResult}</tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}
