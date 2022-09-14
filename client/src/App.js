import React, { useEffect, useState } from "react";
// import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Category from "./components/Category/Category";
import CreateCategory from "./components/CreateCategory/CreateCategory";
import Stats from "./components/Stats/Stats";
import CreatePlaylist from "./components/CreatePlaylist/CreatePlaylist";
import Playlist from "./components/Playlist/Playlist";
import Playlists from "./components/Playlists/Playlists";
import axios from "axios";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/login/profile`)
      .then(() => setLoggedIn(true))
      .catch(() => setLoggedIn(false));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route element={<ProtectedRoutes loggedIn={loggedIn} />}>
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/playlists" exact element={<Playlists />} />
          <Route path="/playlist/:id" exact element={<Playlist />} />
          <Route path="/category-page/:id" exact element={<Category />} />
          <Route path="/createcategory" exact element={<CreateCategory />} />
          <Route path="/createplaylist" exact element={<CreatePlaylist />} />
          <Route path="/stats/:id" exact element={<Stats />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
