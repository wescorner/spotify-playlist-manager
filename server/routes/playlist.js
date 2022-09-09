// route to 1 playlist
// will have all data (songs) of the playlist

const express = require('express');
const router = express.Router();
const { spotifyApi } = require('../app')
require("dotenv").config()
const { getPlaylistFromId, storePlaylists, convertMsToMinutesSeconds, getUserPlaylists } = require('../db/helper/playlists')

module.exports = (pool) => {

  // receives playlist_id in req
  // grabs the info for the playlist id from db and sends it as response
  router.get("/:id", (req, res) => {
    const songResult = []
    const playlistId = req.params.id;
    return pool.query(`
    SELECT spotify_id FROM playlists 
    WHERE playlists.id = $1`,
      [playlistId]
    )
      .then(data => {
        spotifyApi.getPlaylist(data.rows[0].spotify_id)
          .then((data) => {
            data.body.tracks.items.forEach(song => {
              let duration = convertMsToMinutesSeconds(song.track.duration_ms)
              songResult.push([song.track.album.images[2].url, song.track.name, song.track.album.name, song.track.album.release_date, duration])
            })
            res.json(songResult)
          })
      })
  })
  router.post('/create', async (req, res) => {

    const playlistName = req.body.name;
    const description = req.body.description;
    const response = await spotifyApi.createPlaylist(playlistName, { description })
    const idData = await pool.query(`
      SELECT id FROM users WHERE spotify_id = $1`, [response.body.owner.id]
    )
    const userId = idData.rows[0].id

    await pool.query(`INSERT INTO playlists(name, description, spotify_id, user_id)
      VALUES($1, $2, $3, $4)`,
      [response.body.name, response.body.description, response.body.id, userId]
    )
    const playlistsData = await getUserPlaylists(userId)

    res.send(playlistsData)
  })

  // Its a post route to add songs to an existing playlist
  // It receives playlist_id and track id in the body of the request
  router.post('/:id', async (req, res) => {
    const playlistId = req.body.playlistId
    const trackId = req.body.trackId

    spotifyApi.addTracksToPlaylist(playlistId, trackId)
      .then(() => {


      })
      .catch(error => {
        console.log("Error occured", error)
      })
  })

  router.delete('/:id', (req, res) => {
    const playlistId = req.params.id
    return pool.query(`
    DELETE FROM categories_playlists 
    WHERE playlist_id = $1`,
      [playlistId]
    )
  })

  return router
};