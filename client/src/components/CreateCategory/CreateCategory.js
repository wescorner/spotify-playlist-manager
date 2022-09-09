import React from "react";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./CreateCategory.scss";

const handleSubmit = function () {
  console.log("test");
};

export default function CreateCategory() {
  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Header />
        <Card className="createCard">
          <Card.Header>
            <h1>Create Category</h1>
          </Card.Header>
          <Card.Body>
            <Form className="createForm" onSubmit={handleSubmit}>
              <Form.Group className="mb-5">
                <Form.Label>Category Name</Form.Label>
                <Form.Control type="text" size="lg" />
              </Form.Group>
              <Form.Group className="mb-5">
                <Form.Label>Category Image URL</Form.Label>
                <Form.Control type="text" size="lg" />
              </Form.Group>
              <Form.Group className="mb-5">
                <Form.Label>Category Description</Form.Label>
                <Form.Control as="textarea" rows={3} size="lg" />
              </Form.Group>
              <Button type="submit" variant="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
