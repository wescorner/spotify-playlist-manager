import AddCircleIcon from "@material-ui/icons/AddCircle";
import axios from "axios";
import { useState } from "react";
import { Modal, Alert } from "react-bootstrap";

export default function PlaylistModalCard({ categoryid, id, image, title }) {
  const [successShow, setSuccessShow] = useState(false);
  const [failShow, setFailShow] = useState(false);

  const handleAdd = function () {
    axios
      .post(`/playlist/add-to-category`, {
        playlistId: id,
        categoryId: categoryid,
      })
      .then(() => {
        setSuccessShow(true);
        setTimeout(() => setSuccessShow(false), 1000);
      })
      .catch(() => {
        setFailShow(true);
        setTimeout(() => setFailShow(false), 1000);
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
      <p className="playlistName">{title}</p>
      <div className="addIcon">
        <AddCircleIcon onClick={handleAdd} />
      </div>
      <Modal show={successShow} onHide={() => setSuccessShow(false)}>
        <Alert variant="info">Playlist Added</Alert>
      </Modal>
      <Modal
        show={failShow}
        onHide={() => {
          setFailShow(false);
        }}
      >
        <Alert variant="danger">Playlist Already In Category!</Alert>
      </Modal>
    </div>
  );
}
