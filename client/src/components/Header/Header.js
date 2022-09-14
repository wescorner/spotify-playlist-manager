import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Header.scss";

export default function Header() {

  const logout = () => {
    window.location.href = 'http://accounts.spotify.com/logout'
  }

  const [profileInfo, setProfileInfo] = useState([])

  useEffect(() => {
    axios.get('/login/profile')
      .then(res => {
        setProfileInfo(res.data)
      })
  }, [])

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
          src={profileInfo[0] || "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}
          alt="profile"
        />
        <span id="username">{profileInfo[1]}</span>
      </button>
      <button onClick={logout} id="logoutButton">Logout</button>
    </div>
  );
}
