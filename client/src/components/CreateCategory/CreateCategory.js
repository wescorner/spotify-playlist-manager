import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./CreateCategory.scss";
import axios from "axios";
import CancelIcon from '@material-ui/icons/Cancel';



export default function CreateCategory() {

  const refreshToDashboard = () => {
    window.location.href = "http://localhost:3000/dashboard"
  }

  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = function (e) {
    e.preventDefault()
    axios.post('/category', {
      categoryName: name,
      categoryImage: image,
      categoryDescription: description
    })
      .then(response => {
        refreshToDashboard()
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Header />
        <Card className="createCard">
          <Card.Header className="createCardHead">
            <h1>Create Category</h1>
            <CancelIcon onClick={refreshToDashboard} className="svg_icons createCardCancel" />
          </Card.Header>
          <Card.Body>
            <Form className="createForm" onSubmit={handleSubmit}>
              <Form.Group className="mb-5">
                <Form.Label>Category Name</Form.Label>
                <Form.Control type="text" value={name} onChange={e => { setName(e.target.value) }} size="lg" />
              </Form.Group>
              <Form.Group className="mb-5">
                <Form.Label>Category Image URL</Form.Label>
                <Form.Control type="text" value={image} onChange={e => { setImage(e.target.value) }} size="lg" />
              </Form.Group>
              <Form.Group className="mb-5">
                <Form.Label>Category Description</Form.Label>
                <Form.Control as="textarea" value={description} onChange={e => { setDescription(e.target.value) }} rows={3} size="lg" />
              </Form.Group>
              <Button type="submit" variant="submit">
                Create
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
