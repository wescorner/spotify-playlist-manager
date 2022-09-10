import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import "./PlaylistCard.scss";
export default function PlaylistCard({
  id,
  categoryid,
  image,
  title,
  description,
  totalTracks,
}) {
  const navigate = useNavigate();

  const onClick = () => navigate(`/playlist/${id}`)
  const handleDelete = function (e) {
    console.log("playlistID:", id);
    console.log("categoryID:", categoryid);
    axios
      .delete(`/playlist/${id}`, {
        data: { category: categoryid },
      })
      .then(() => {
        window.location.href = `/category-page/${categoryid}`;
      });
    e.stopPropagation();
  };

  return (
    <div className="playlistCard" onClick={onClick}>
      <img className="playlistIcon" src={image} alt="icon" />
      <p className="playlistName">{title}</p>
      <div className="deleteIcon">
        <DeleteIcon onClick={handleDelete} />
      </div>
    </div>
  );
}
