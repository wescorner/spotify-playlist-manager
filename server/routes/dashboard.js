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
        topTracks.push({ name: song.name, playCount: Math.floor(Math.random() * 400), image: song.album.images[1].url })
      })
      const resultTracks = topTracks.sort((a, b) => b.playCount - a.playCount)
      return res.json(resultTracks)
    } catch (err) {
      console.log(err);
      res.sendStatus(500)
    }

  })

  return router
};