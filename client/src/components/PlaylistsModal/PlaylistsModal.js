import Modal from "react-bootstrap/Modal";
import PlaylistModalCard from "../PlaylistModalCard/PlaylistModalCard";
import "./PlaylistModal.scss";

const args = {
  title: "Chill Vibes Playlist",
  description: "A cool playlist for just vibing and jamming out",
  totalTracks: 21,
  image:
    "https://www.liveabout.com/thmb/pwO4o_iDrZRTmmhs7eOfD25Qoqw=/1500x1125/smart/filters:no_upscale()/pop-music-57bce3863df78c87634ea806.jpg",
};

export default function PlaylistsModal(props) {
  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <h3>All Playlists</h3>
      </Modal.Header>
      <Modal.Body>
        <div className="playlists">
          <PlaylistModalCard className="playlistItem" {...args} />
          <PlaylistModalCard className="playlistItem" {...args} />
          <PlaylistModalCard className="playlistItem" {...args} />
          <PlaylistModalCard className="playlistItem" {...args} />
          <PlaylistModalCard className="playlistItem" {...args} />
          <PlaylistModalCard className="playlistItem" {...args} />
          <PlaylistModalCard className="playlistItem" {...args} />
          <PlaylistModalCard className="playlistItem" {...args} />
          <PlaylistModalCard className="playlistItem" {...args} />
          <PlaylistModalCard className="playlistItem" {...args} />
          <PlaylistModalCard className="playlistItem" {...args} />
        </div>
      </Modal.Body>
    </Modal>
  );
}
