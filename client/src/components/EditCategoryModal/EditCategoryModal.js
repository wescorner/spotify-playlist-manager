import { Modal, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./EditCategoryModal.scss";

export default function EditCategoryModal(props) {
  console.log("props:", props);
  const [name, setName] = useState(props.name);
  const [image, setImage] = useState(props.image);
  const [description, setDescription] = useState(props.description);

  useEffect(() => {
    setName(props.name);
    setImage(props.image);
    setDescription(props.description);
  }, [props.name, props.image, props.description]);

  const handleSubmit = function (e) {
    e.preventDefault();
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
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-5">
            <Form.Label>Category Image URL</Form.Label>
            <Form.Control
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-5">
            <Form.Label>Category Description</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
