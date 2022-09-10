import React from "react";
// import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Category from "./components/Category/Category";
import CreateCategory from "./components/CreateCategory/CreateCategory";
import Stats from "./components/Stats/Stats";
import CreatePlaylist from "./components/CreatePlaylist/CreatePlaylist";
import Playlist from "./components/Playlist/Playlist"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/playlists" exact element={<Dashboard />} />
        <Route path="/playlist/:id" exact element={<Playlist />} />
        <Route path="/category-page/" exact element={<Category />} />
        <Route path="/category-page/:id" exact element={<Category />} />
        <Route path="/createcategory" exact element={<CreateCategory />} />
        <Route path="/createplaylist" exact element={<CreatePlaylist />} />
        <Route path="/stats" exact element={<Stats />} />
        <Route path="/stats/:id" exact element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default App;
