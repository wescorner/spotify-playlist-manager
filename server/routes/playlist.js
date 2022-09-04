// route to 1 playlist
// will have all data (songs) of the playlist

const express = require('express');
const router = express.Router();


module.exports = (db) => {

  //Interacts with API in order to grab users playlist information
  router.get('/', async (req, res) => {
    const userPlaylists = []
    await spotifyApi.getUserPlaylists({ limit: 50 })
      .then(data => {
        data.body.items.forEach(p => { //p represents playlist item
          userPlaylists.push({ name: p.name, id: p.id, description: p.description, image: p.images[0].url, owner: p.owner.display_name, tracks: { count: p.tracks.total, href: p.tracks.href } })
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

  // router.post('/', async (req, res) => {
  //   spotifyApi.addTracksToPlaylist(//Playlist ID, [TrackID])
  //   .then(data => {
  //     res.status(200).send("Songs successfully added to playlist")
  //   })
  //       .catch(error => {
  //         console.log("Error occured", error)
  //       })
  // })

  return router
};