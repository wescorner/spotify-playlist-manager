// route to 1 playlist
// will have all data (songs) of the playlist

const express = require('express');
const router = express.Router();
const { spotifyApi } = require('../app')
require("dotenv").config()
const { getPlaylistFromId, storePlaylists, convertMsToMinutesSeconds, getUserPlaylists, updatePlaylist } = require('../db/helper/playlists')

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
              songResult.push({ image: song.track.album.images[2].url, name: song.track.name, album: song.track.album.name, releaseDate: song.track.album.release_date, duration: duration })
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

  router.post('/search', async (req, res) => {
    const searchQuery = req.body.searchQuery;
    const types = ['track']
    const searchResult = await spotifyApi.search(searchQuery, types, { limit: 10 })

    const tracks = [];
    searchResult.body.tracks.items.map((item) => {
      const track = {}
      track["name"] = item.name;
      track["uri"] = item.uri;
      track["duration_ms"] = convertMsToMinutesSeconds(item.duration_ms);
      track["artist"] = item.album.artists[0].name;
      track["album"] = item.album.name;
      track["image"] = item.album.images[0].url

      tracks.push(track)
    })
    res.send(tracks)
  })

  // Its a post route to add songs to an existing playlist
  // It receives playlist_id and track id in the body of the request
  router.post('/:id', async (req, res) => {
    const playlistId = req.body.playlistId
    const track = req.body.track

    const id = await pool.query(`
    SELECT spotify_id FROM playlists WHERE id = $1`,
      [playlistId]
    )
    const spotifyId = id.rows[0].spotify_id
    await spotifyApi.addTracksToPlaylist(spotifyId, track)
    const playlistData = await spotifyApi.getPlaylist(spotifyId)
    const playlistUpdatedData = [
      playlistData.body.images[0].url,
      playlistData.body.owner.display_name,
      playlistData.body.name,
      playlistData.body.description,
      playlistData.body.tracks.total,
      playlistData.body.tracks.href
    ]
    await updatePlaylist(playlistId, playlistUpdatedData)
    const playlist = []
    playlistData.body.tracks.items.map((song) => {
      let duration = convertMsToMinutesSeconds(song.track.duration_ms)
      playlist.push(
        {
          image: song.track.album.images[2].url,
          name: song.track.name,
          album: song.track.album.name,
          artist: song.track.album.artists[0].name,
          releaseDate: song.track.album.release_date,
          duration: duration
        })
    })
    res.send(playlist)
  })

  router.delete('/:id', (req, res) => {
    const playlistId = req.params.id
    return pool.query(`
    DELETE FROM categories_playlists 
    WHERE playlist_id = $1`,
      [playlistId]
    )
  })

  router.post('/add/:id', (req, res) => {
    const playlistId = req.params.id
    const categoryId = req.body.category
    return pool.query(`
    INSERT INTO categories_playlists (playlist_id, category_id) VALUES ($1. $2)`, [playlistId, categoryId])
      .then(res => {
        res.sendStatus(200)
      })
      .catch(err => {
        console.log(err)
      })
  })

  return router
};