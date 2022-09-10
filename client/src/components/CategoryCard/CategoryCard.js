import Card from "react-bootstrap/Card";
import "./CategoryCard.scss";

export default function CategoryCard({ image, description, title, totalPlaylists, onClick }) {
  return (
    <Card className="categoryCard" onClick={onClick}>
      <Card.Img className="category-card-img" variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description} <br />
        </Card.Text>
        <hr />
        <Card.Text>Playlists: {totalPlaylists}</Card.Text>
      </Card.Body>
    </Card>
  );
}
