import React from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container className="text-center mt-5">
      <Login />
    </Container>
  );
}

export default App;
