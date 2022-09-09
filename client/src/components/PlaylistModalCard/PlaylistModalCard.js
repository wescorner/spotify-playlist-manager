import AddCircleIcon from "@material-ui/icons/AddCircle";
export default function PlaylistModalCard({ image, title }) {
  return (
    <div className="playlistCard">
      <img className="playlistIcon" src={image} alt="icon" />
      <p className="playlistName">{title}</p>
      <div className="addIcon">
        <AddCircleIcon />
      </div>
    </div>
  );
}
