import Card from "react-bootstrap/Card";
import "./CategoryCard.scss";

export default function CategoryCard({ image, description, title, totalPlaylists, onClick }) {
  return (
    <Card className="categoryCard" onClick={onClick}>
      <Card.Body>
        <img className="category-card-img" src={image} alt="icon" />
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description} <br />
        </Card.Text>
        <hr />
        <Card.Text>
          {totalPlaylists} {totalPlaylists === 1 ? "Playlist" : "Playlists"}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
