import Modal from "react-bootstrap/Modal";

export default function PlaylistsModal(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>All Playlists</Modal.Header>
      <Modal.Body>This is the text in the modal</Modal.Body>
    </Modal>
  );
}
