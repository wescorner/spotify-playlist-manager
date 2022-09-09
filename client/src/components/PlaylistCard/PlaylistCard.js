import DeleteIcon from "@material-ui/icons/Delete";

import "./PlaylistCard.scss";
export default function PlaylistCard({ image, title, description, totalTracks, onClick }) {
  return (
    <div className="playlistCard">
      <img className="playlistIcon" src={image} alt="icon" />
      <p className="playlistName">{title}</p>
      <div className="deleteIcon">
        <DeleteIcon />
      </div>
    </div>
  );
}
