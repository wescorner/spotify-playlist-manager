import React from 'react';
import '../styles/dashboard.scss'
import { Container } from 'react-bootstrap';

export default function Dashboard() {
  return (
    <Container className="min-vh-100 min-vw-100" style={{ background: '#373737' }}>
      <h1> Logged In </h1>
      <section className="sideNav"></section>
    </Container >
  );
}
