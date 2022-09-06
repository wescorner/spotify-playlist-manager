// route to 1 playlist
// will have all data (songs) of the playlist

const express = require('express');
const router = express.Router();
const { spotifyApi } = require('../app')
require("dotenv").config()
const { getPlaylistFromId, storePlaylists } = require('../db/helper/playlists')

module.exports = (pool) => {

  // receives palylist_id in req
  // grabs the info for the playlist id from db and sends it as response
  router.get("/:id", (req, res) => {
    const playlistId = 1;
    getPlaylistFromId(playlistId)
      .then((data) => {
        res.send(data)
      })
  })

  // Its a post route to add songs to an existing playlist
  // It receives playlist_id and track id in the body of the request
  router.post('/:id', async (req, res) => {
    const playlistId = req.body.playlistId
    const trackId = req.body.trackId

    spotifyApi.addTracksToPlaylist(playlistId, trackId)
      .then(() => {


      })
      .catch(error => {
        console.log("Error occured", error)
      })
  })

  return router
};