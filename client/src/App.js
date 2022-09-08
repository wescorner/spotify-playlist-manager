import React from "react";
// import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Category from "./components/Category/Category";
import Stats from "./components/Stats/Stats";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/index" exact element={<Dashboard />} />
        <Route path="/category" exact element={<Category />} />
        <Route path="/stats" exact element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default App;
