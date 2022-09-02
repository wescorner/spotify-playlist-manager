const express = require('express')
const PORT = 8080
require("dotenv").config()
const querystring = require('querystring')


const app = express()

app.get('/login', (req, res) => {

  const scope = 'user-read-private user-read-email ugc-image-upload streaming user-follow-modify user-read-recently-played user-read-playback-position user-top-read playlist-modify-public user-library-modify user-follow-read user-read-currently-playing user-library-read playlist-read-private user-read-private playlist-modify-private';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'token',
      client_id: process.env.CLIENT_ID,
      scope: scope,
      redirect_uri: process.env.REDIRECT_URI,
    }));
})


app.listen(PORT, () => console.log(`Listening on ${PORT}`))