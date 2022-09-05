// route to a playlist dashbord
// will have all the stats for the selected playlist

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

  //Interacts with API in order to grab users top tracks up to 50
  router.get('/', async (req, res) => {

    const topTracks = []
    await spotifyApi.getMyTopTracks({ limit: 50 })
      .then(data => {
        data.body.items.forEach(song => {
          topTracks.push({ name: song.name, id: song.id, image: song.album.images[1].url })
        })
        res.json(topTracks)
      })
      .catch(err => {
        console.log(err)
        if (err.body.error.message === 'No token provided') {
          return res.redirect('/login')
        }
        res.sendStatus(500)
      })
  })

  return router
};