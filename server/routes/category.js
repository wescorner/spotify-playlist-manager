// routeto one category
// will have data of all the playlists under the category

const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node')
require("dotenv").config()

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI
})

module.exports = (pool) => {

  // router.post("/", (req, res) => {
  //   return pool.query(`INSERT INTO categories (name, image, user_id) VALUES ($1, $2, $3)`, profileInfo)
  // })

  return router
};