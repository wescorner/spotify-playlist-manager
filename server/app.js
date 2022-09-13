const express = require("express");
require("dotenv").config();
const SpotifyWebApi = require("spotify-web-api-node");
const { storePlaylists } = require("./db/helper/playlists");
const bodyParser = require("body-parser");
const pool = require("./configs/db.config");
const cors = require("cors");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

module.exports.spotifyApi = spotifyApi;

//Separated Routes for each Resource
const categoryRoutes = require("./routes/category");
const playlistRoutes = require("./routes/playlist");
const loginRoutes = require("./routes/login");
const dashboardRoutes = require("./routes/dashboard");

// Mount all resource routes
app.use("/category", categoryRoutes(pool));
app.use("/playlist", playlistRoutes(pool));
app.use("/login", loginRoutes(pool));
app.use("/dashboard", dashboardRoutes(pool));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
