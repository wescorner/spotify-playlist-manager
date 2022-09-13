import React from "react";
import "../styles/login.scss";
import { Container } from "react-bootstrap";
import spotifyLogo from "../images/Spotify_Logo_CMYK_White.png";

export default function Login({ setLoggingIn }) {
  return (
    <Container className="d-flex flex-column align-items-md-center min-vh-100 min-vw-100 bg-black">
      <img src={spotifyLogo} alt="SpotifyLogo" />
      <h1 className="title">Playlist Manager</h1>
      <a
        className="login"
        href="https://playlist-manager-server.herokuapp.com/login"
        onClick={setLoggingIn}
      >
        {" "}
        Log in With Spotify
      </a>
    </Container>
  );
}
