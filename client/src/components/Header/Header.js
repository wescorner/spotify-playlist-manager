import React from "react";
import "./Header.scss";

export default function Header() {
  return (
    <div className="header">
      <h1>Spotify Playlist Manager</h1>
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
