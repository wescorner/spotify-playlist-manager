import React from "react";
import "./Header.scss";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitle">
        <img
          id="logo"
          src="https://1000logos.net/wp-content/uploads/2021/04/Spotify-logo.png"
          alt="logo"
        />
        <h1>Playlist Manager</h1>
      </div>
      <button id="profileButton">
        <img
          id="userPhoto"
          src="https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="profile"
        />
        <span id="username">freelancer5hire</span>
      </button>
      <button id="logoutButton">Logout</button>
    </div>
  );
}
