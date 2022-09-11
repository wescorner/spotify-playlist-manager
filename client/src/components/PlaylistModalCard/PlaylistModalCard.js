import AddCircleIcon from "@material-ui/icons/AddCircle";
import axios from "axios";
import { useState } from "react";
import { Modal, Alert } from "react-bootstrap";

export default function PlaylistModalCard({ categoryid, id, image, title }) {
  const [show, setShow] = useState(false);
  const handleAdd = function () {
    axios
      .post(`/playlist/add-to-category`, {
        playlistId: id,
        categoryId: categoryid,
      })
      .then(() => {
        setShow(true);
        setTimeout(() => setShow(false), 100);
      });
  };
  return (
    <div className="playlistCard">
      <img
        className="playlistIcon"
        src={
          image
            ? image
            : "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999"
        }
        alt="icon"
      />
      <Modal show={show} onHide={() => setShow(false)}>
        <Alert variant="info">Playlist Added</Alert>
      </Modal>
      <p className="playlistName">{title}</p>
      <div className="addIcon">
        <AddCircleIcon onClick={handleAdd} />
      </div>
    </div>
  );
}
