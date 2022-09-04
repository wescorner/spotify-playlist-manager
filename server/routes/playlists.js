// const express = require('express')
// require("dotenv").config()

// const querystring = require('querystring')
// const SpotifyWebApi = require('spotify-web-api-node')
// const util = require('util')
// const { storePlaylists } = require('../db/helper/playlists')
// const PORT = 8080

// const app = express()

// const spotifyApi = new SpotifyWebApi({
//   clientId: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   redirectUri: process.env.REDIRECT_URI
// })
// app.get('/playlists', async (req, res) => {
//   const userPlaylists = []
//   await spotifyApi.getUserPlaylists({ limit: 50 })
//     .then(data => {
//       data.body.items.forEach(p => { //p represents playlist item
//         userPlaylists.push({ name: p.name, id: p.id, description: p.description, image: p.images[0].url, owner: p.owner.display_name, tracks: { count: p.tracks.total, href: p.tracks.href } })
//       })
//       res.json(userPlaylists)
//       storePlaylists(userPlaylists) 
//     })
//     .catch(err => {
//       console.log(err)
//       if (err.body.error.message === "No token provided") {
//         return res.redirect('/login')
//       }
//     })
// })