"use strict"

const pool = require("../../configs/db.config")

const getUserPlaylists = (userId) => {
  return pool.query(`
    SELECT spotify_id FROM playlists 
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
      const exists = data.some((dataPlaylist) => dataPlaylist.spotify_id  === playlist.id);
      console.log(exists, data, playlist);
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

module.exports = {storePlaylists}