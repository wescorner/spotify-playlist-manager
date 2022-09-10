import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

import "./PlaylistCard.scss";
export default function PlaylistCard({
  id,
  categoryid,
  image,
  title,
  description,
  totalTracks,
  onClick,
}) {
  const handleDelete = function () {
    console.log("playlistID:", id);
    console.log("categoryID:", categoryid);
    axios
      .delete(`/playlist/${id}`, {
        data: { category: categoryid },
      })
      .then(() => {
        window.location.href = `/category/${categoryid}`;
      });
  };

  return (
    <div className="playlistCard">
      <img className="playlistIcon" src={image} alt="icon" />
      <p className="playlistName">{title}</p>
      <div className="deleteIcon">
        <DeleteIcon onClick={handleDelete} />
      </div>
    </div>
  );
}
