// route to login page
const express = require('express')
const router = express.Router();
const querystring = require('querystring')
const SpotifyWebApi = require('spotify-web-api-node')
require("dotenv").config()

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI
})

module.exports = (db) => {
  //Spotify credential verification, ensures user has auth token and is logged in
  router.get('/', (req, res) => {

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
  router.get('/callback', async (req, res) => {
    const { code } = req.query;
    try {
      const data = await spotifyApi.authorizationCodeGrant(code)
      const { access_token, refresh_token } = data.body
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      spotifyApi.getMe()
        .then(data => {
          console.log(data)
        })

      res.redirect('http://localhost:3000/index')
    } catch (err) {
      res.redirect('/#/error/invalid token')
    }
  })

  //Interacts with API to grab profile image and name
  router.get('/profile', async (req, res) => {

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

  return router
};