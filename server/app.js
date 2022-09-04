const express = require('express')
require("dotenv").config()
const querystring = require('querystring')
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

app.listen(PORT, () => console.log(`Listening on ${PORT}`))