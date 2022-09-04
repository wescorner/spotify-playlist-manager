const express = require('express')
require("dotenv").config()
const querystring = require('querystring')
const SpotifyWebApi = require('spotify-web-api-node')
const util = require('util')
const PORT = 8080

const app = express()

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI
})

//Spotify credential verification, ensures user has auth token and is logged in
app.get('/login', (req, res) => {

  const scope = 'user-read-private user-read-email ugc-image-upload streaming user-follow-modify user-read-recently-played user-read-playback-position user-top-read playlist-modify-public user-library-modify user-follow-read user-read-currently-playing user-library-read playlist-read-private user-read-private playlist-modify-private';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope: scope,
      redirect_uri: process.env.REDIRECT_URI,
    }));
})

//Sets access token and refresh token after verification of spotify credentials
app.get('/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const data = await spotifyApi.authorizationCodeGrant(code)
    const { access_token, refresh_token } = data.body
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    res.redirect('http://localhost:3000/dashboard')
  } catch (err) {
    res.redirect('/#/error/invalid token')
  }
})

//Interacts with API to grab profile image and name
app.get('/profile', async (req, res) => {

  const profileInformation = {}
  await spotifyApi.getMe()
    .then(data => {
      profileInformation.image = data.body.images[0].url
      profileInformation.display_name = data.body.display_name
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

//Interacts with API in order to grab users top tracks up to 50
app.get('/dashboard', async (req, res) => {

  const topTracks = []
  await spotifyApi.getMyTopTracks({ limit: 50 })
    .then(data => {
      data.body.items.forEach(song => {
        topTracks.push({ [song.name]: { id: song.id, image: song.album.images[1].url } })
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
        userPlaylists.push({ [p.name]: { id: p.id, description: p.description, image: p.images[0].url, owner: p.owner.display_name, tracks: { count: p.tracks.total, href: p.tracks.href } } })
      })
      res.json(userPlaylists)
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