import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './PlaylistHead.scss'

export default function PlaylistHead({playlistName, description, image, owner, totalSongs, onPlay, onDashboard, onDelete}) {
  return (
    <Card className='playlist-head'>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <img src={image} width="100%"/>   
        </Card.Body>
      </Card>
      <Card.Body>
          <Card.Title>{playlistName}</Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
          <Card.Text>
            {owner} | {totalSongs}
          </Card.Text>
          <Button onClick={onPlay} variant="success">Play in Spotify</Button>
          <Button onClick={onDashboard} variant="info">Dashboard</Button>
          <Button onClick={onDelete} variant="danger">Delete</Button>
        </Card.Body>
    </Card>
    
  );
}
