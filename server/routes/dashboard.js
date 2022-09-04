// route to a playlist dashbord
// will have all the stats for the selected playlist

const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node')

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI
})

module.exports = (db) => {

  return router
};