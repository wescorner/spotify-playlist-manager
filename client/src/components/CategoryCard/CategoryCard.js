import Card from "react-bootstrap/Card";

export default function CategoryCard({ image, description, title, totalPlaylists, onClick }) {
  return (
    <Card onClick={onClick}>
      <Card.Img variant="top" src={image} />
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
