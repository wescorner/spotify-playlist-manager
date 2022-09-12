import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './PlaylistHead.scss'

export default function PlaylistHead({name, description, image, owner, totalSongs, onPlay, onDashboard, onAddClicked}) {
  return (
    <Card className='playlist-head'>
      <Card className='playlist-image-container' style={{ width: '18rem' }}>
        <Card.Body className={'playlist-image'}>
          <img src={image} width="100%" alt="cover-art"/>   
        </Card.Body>
      </Card>
      <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
          <Card.Text>
            {owner} | {totalSongs}
          </Card.Text>
          <Button onClick={onPlay} variant="success" style={{ marginRight: "10px"}}>Play in Spotify</Button>
          <Button onClick={onAddClicked} variant="success" style={{ marginRight: "10px"}}>Add songs</Button>
          <Button onClick={onDashboard} variant="info" style={{ marginRight: "10px"}}>Dashboard</Button>
        </Card.Body>
    </Card>
    
  );
}
