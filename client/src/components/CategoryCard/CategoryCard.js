import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function CategoryCard({image, description, title, totalPlaylists, onClick}) {
  return (
    <Card onClick={onClick}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description} <br/>
          total Playlists = {totalPlaylists}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
