import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PlaylistCard.scss";

export default function PlaylistCard({ id, categoryid, image, title, setDeleteShow, hideDeleteIcon }) {
  const navigate = useNavigate();
  const onClick = () => navigate(`/playlist/${id}`);

  const handleDelete = function (e) {
    axios
      .delete(`/playlist/${id}`, {
        data: { category: categoryid },
      })
      .then(() => {
        setDeleteShow(true);
        setTimeout(() => setDeleteShow(false), 1000);
        navigate(0);
      });
    e.stopPropagation();
  };

  return (
    <div className="playlistCard" onClick={onClick}>
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
      <div className="deleteIcon">
        {hideDeleteIcon || <DeleteIcon onClick={handleDelete}/>}
      </div>
    </div>
  );
}
