import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

import "./PlaylistCard.scss";
export default function PlaylistCard({ id, categoryid, image, title, onClick }) {
  const handleDelete = function () {
    console.log("playlistID:", id);
    console.log("categoryID:", categoryid);
    axios
      .delete(`/playlist/${id}`, {
        data: { category: categoryid },
      })
      .then(() => {
        window.location.href = `/category-page/${categoryid}`;
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
      <div className="deleteIcon">
        <DeleteIcon onClick={handleDelete} />
      </div>
    </div>
  );
}
