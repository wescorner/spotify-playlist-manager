const express = require('express')
require("dotenv").config()
const querystring = require('querystring')
const SpotifyWebApi = require('spotify-web-api-node')
const {storePlaylists} = require('./db/helper/playlists')
const util = require('util')
const PORT = 8080
const pool = require('./configs/db.config')
const app = express()

//Separated Routes for each Resource
const categoryRoutes = require("./routes/category");
const indexRoutes = require("./routes/index");
const playlistRoutes = require("./routes/playlist");
const loginRoutes = require("./routes/login");
const dashboardRoutes = require("./routes/dashboard");

//Interacts with API to grab profile image and name
app.get('/profile', async (req, res) => {

  const profileInformation = {}
  await spotifyApi.getMe()
    .then(data => {
      profileInformation.image = data.body.images[0].url
      profileInformation.display_name = data.body.display_name
      console.log(profileInformation)
      return res.json(profileInformation)
      
    })
    .catch(err => {
      console.log(err)
      if (err.body.error.message === 'No token provided') {
        return res.redirect('/login')
      }
      res.sendStatus(500)
    })
})

// Mount all resource routes
app.use("/category", categoryRoutes(pool));
app.use("/index", indexRoutes(pool));
app.use("/playlist", playlistRoutes(pool));
app.use("/login", loginRoutes(pool));
app.use("/dashboard", dashboardRoutes(pool));


//Interacts with API in order to grab users top tracks up to 50
app.get('/dashboard', async (req, res) => {

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

//Interacts with API in order to grab users playlist information
app.get('/playlists', async (req, res) => {
  const userPlaylists = []
  await spotifyApi.getUserPlaylists({ limit: 50 })
    .then(data => {
      data.body.items.forEach(p => { //p represents playlist item
        userPlaylists.push({ name: p.name, id: p.id, description: p.description, image: p.images[0].url, owner: p.owner.display_name, tracks: { count: p.tracks.total, href: p.tracks.href } })
      })
      res.json(userPlaylists)
      console.log(userPlaylists)
      storePlaylists(userPlaylists) 
    })
    .catch(err => {
      console.log(err)
      if (err.body.error.message === "No token provided") {
        return res.redirect('/login')
      }
    })
})

// app.post('/playlists', async (req, res) => {
//   spotifyApi.addTracksToPlaylist(//Playlist ID, [TrackID])
//   .then(data => {
//     res.status(200).send("Songs successfully added to playlist")
//   })
//       .catch(error => {
//         console.log("Error occured", error)
//       })
// })

app.listen(PORT, () => console.log(`Listening on ${PORT}`))