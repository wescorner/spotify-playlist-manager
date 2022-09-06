// route to login page
const { profile } = require('console');
const express = require('express')
const router = express.Router();
const querystring = require('querystring')
require("dotenv").config()
const { spotifyApi } = require('../app')
const { collapseTextChangeRangesAcrossMultipleVersions } = require('typescript');
const { storePlaylists } = require('../db/helper/playlists')

module.exports = (pool) => {
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

      //Inserts user details into database if they don't already exist
      spotifyApi.getMe()
        .then(data => {
          const profileInfo = [];
          profileInfo.push(data.body.images[0].url, data.body.display_name, data.body.email.toLowerCase(), data.body.id)
          return pool.query(`SELECT spotify_id FROM USERS`)
            .then(data => {
              const userExists = data.rows.find(user => user.spotify_id === profileInfo[3])
              if (userExists === undefined) {
                return pool.query(`INSERT INTO users (image, name, email, spotify_id) VALUES ($1, $2, $3, $4)`, profileInfo)
              }
            })
        })
        .then(() => {
          const userPlaylists = []
          spotifyApi.getUserPlaylists({ limit: 50 })
            .then(data => {
              data.body.items.forEach(p => { //p represents playlist item
                userPlaylists.push({ name: p.name, id: p.id, description: p.description, image: p.images[0].url, owner: p.owner.display_name, tracks: { count: p.tracks.total, href: p.tracks.href } })
              })
              storePlaylists(userPlaylists)
            })
        })
      res.redirect('http://localhost:3000/index')
    } catch (err) {
      res.send('Invalid or expired token, please login again')
    }
  })

  return router
};