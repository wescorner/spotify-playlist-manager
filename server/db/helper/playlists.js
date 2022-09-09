"use strict"

const pool = require("../../configs/db.config")

const getUserPlaylists = (userId) => {
  return pool.query(`
    SELECT * FROM playlists 
    WHERE user_id = $1`,
    [userId]
  )
    .then((data) => {
      return (data.rows)
    })
}

const storePlaylists = (playlists) => {

  const userId = 1
  getUserPlaylists(userId)
    .then((data) => {

      const allPlaylists = []
      for (const playlist of playlists) {
        const exists = data.some((dataPlaylist) => dataPlaylist.spotify_id === playlist.id);
        // console.log(exists, data, playlist);
        if (!exists) {
          allPlaylists.push(
            pool.query(`
            INSERT INTO PLAYLISTS(name, spotify_id, image, owner, description, total_tracks, tracks, user_id)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
              [
                playlist.name,
                playlist.id,
                playlist.image,
                playlist.owner,
                playlist.description,
                playlist.tracks.count,
                playlist.tracks.href,
                userId
              ]
            )
          )
        }

      }
      return Promise.all(allPlaylists)

    })

}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function convertMsToMinutesSeconds(milliseconds) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.round((milliseconds % 60000) / 1000);

  return seconds === 60
    ? `${minutes + 1}:00`
    : `${minutes}:${padTo2Digits(seconds)}`;
}

module.exports = { storePlaylists, convertMsToMinutesSeconds, getUserPlaylists }