import Card from 'react-bootstrap/Card';

export default function PlaylistCard ({image, title, description, totalTracks, onClick}) {
  return (
    <Card onClick={onClick} className="bg-dark text-white">
      <Card.Img src={image} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description} <br/>
          total tracks = {totalTracks}
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
}
