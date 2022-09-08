import DeleteIcon from "@material-ui/icons/Delete";

import "./PlaylistCard.scss";
export default function PlaylistCard({ image, title, description, totalTracks, onClick }) {
  return (
    // <Card onClick={onClick} className="bg-dark text-white playlistCard">
    //   <Card.Img src={image} alt="Card image" />
    //   <Card.Body>
    //     <Card.Title>{title}</Card.Title>
    //   </Card.Body>
    // </Card>
    <div className="playlistCard">
      <img className="playlistIcon" src={image} alt="icon" />
      <p className="playlistName">{title}</p>
      <div className="deleteIcon">
        <DeleteIcon />
      </div>
    </div>
  );
}
