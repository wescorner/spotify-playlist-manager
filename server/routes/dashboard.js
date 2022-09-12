// route to a playlist dashbord
// will have all the stats for the selected playlist

const express = require('express');
const router = express.Router();
require("dotenv").config()
const { spotifyApi } = require('../app')

module.exports = (pool) => {

  //Interacts with API in order to grab users top tracks up to 50
  router.get('/', async (req, res) => {
    try {
      const topTracks = []
      const data = await spotifyApi.getMyTopTracks({ limit: 50 });
      data.body.items.forEach(song => {
        topTracks.push(song.id)
      })
      return res.json(topTracks)
    } catch (err) {
      console.log(err);
      res.sendStatus(500)
    }
  })

  router.delete("/track", (req, res) => {
    try {
      const tracksResult = [];
      const albumId = req.body.albumId
      const tracks = req.body.deleteSongs
      tracks.forEach(track => {
        tracksResult.push({ uri: `spotify:track:${track}` })
      })
      spotifyApi.removeTracksFromPlaylist(albumId, tracksResult)
        .then(() => {
          res.sendStatus(200)
        })
    } catch (err) {
      console.log(err);
      res.sendStatus(500)
    }
  })


  return router
};