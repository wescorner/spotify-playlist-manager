import { Modal, Form } from "react-bootstrap";
import { useState } from "react";
import "./EditCategoryModal.scss";

export default function EditCategoryModal(props) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = function () {
    //
  };

  return (
    <Modal {...props} size="lg">
      <Modal.Header closeButton>
        <h3>Edit Category</h3>
      </Modal.Header>
      <Modal.Body>
        <Form className="editForm" onSubmit={handleSubmit}>
          <Form.Group className="mb-5">
            <Form.Label>Category Name</Form.Label>
            <Form.Control type="text"></Form.Control>
          </Form.Group>
          <Form.Group className="mb-5">
            <Form.Label>Category Image URL</Form.Label>
            <Form.Control type="text"></Form.Control>
          </Form.Group>
          <Form.Group className="mb-5">
            <Form.Label>Category Description</Form.Label>
            <Form.Control as="textarea" rows={3} size="lg"></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
