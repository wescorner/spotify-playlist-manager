// route to 1 playlist
// will have all data (songs) of the playlist

const express = require("express");
const router = express.Router();
const { spotifyApi } = require("../app");
require("dotenv").config();
const {
  getPlaylistFromId,
  storePlaylists,
  convertMsToMinutesSeconds,
  getUserPlaylists,
  updatePlaylist,
} = require("../db/helper/playlists");

module.exports = (pool) => {
  //get all users playlists
  router.get("/all", async (req, res) => {
    try {
      const {
        body: { id },
      } = await spotifyApi.getMe();
      const {
        body: { items: playlists },
      } = await spotifyApi.getUserPlaylists(id);
      return res.send(playlists);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  });

  // receives playlist_id in req
  // grabs the info for the playlist id from db and sends it as response
  router.get("/:id", (req, res) => {
    const songResult = [];
    let albumId = ""
    const playlistId = req.params.id;
    return pool
      .query(
        `
    SELECT spotify_id FROM playlists 
    WHERE playlists.id = $1`,
        [playlistId]
      )
      .then((data) => {
        albumId = (data.rows[0].spotify_id)
        return spotifyApi.getPlaylist(data.rows[0].spotify_id);
      })
      .then(({ body: { name, description, tracks, external_urls, images, owner } }) => {
        tracks.items.forEach((song) => {
          let duration = convertMsToMinutesSeconds(song.track.duration_ms);
          songResult.push({
            image: song.track.album.images[2].url,
            name: song.track.name,
            album: song.track.album.name,
            releaseDate: song.track.album.release_date,
            duration: duration,
            playCount: Math.floor(Math.random() * 400),
            id: song.track.id
          });
        });
        const resultTracks = songResult.sort((a, b) => b.playCount - a.playCount);
        return res.json({
          name,
          description,
          image: images[0]?.url,
          owner: owner.display_name,
          spotifyURL: external_urls.spotify,
          albumId,
          tracks: resultTracks,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.sendStatus(500);
      });
  });
  router.post("/create", async (req, res) => {
    try {
      const playlistName = req.body.name;
      const description = req.body.description;
      const response = await spotifyApi.createPlaylist(playlistName, { description });
      const idData = await pool.query(
        `
      SELECT id FROM users WHERE spotify_id = $1`,
        [response.body.owner.id]
      );
      const userId = idData.rows[0].id;

      await pool.query(
        `INSERT INTO playlists(name, description, spotify_id, user_id)
      VALUES($1, $2, $3, $4)`,
        [response.body.name, response.body.description, response.body.id, userId]
      );
      const playlistsData = await getUserPlaylists(userId);

      res.send(playlistsData);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  router.post("/search", async (req, res) => {
    try {
      const searchQuery = req.body.searchQuery;
      const types = ["track"];
      const searchResult = await spotifyApi.search(searchQuery, types, { limit: 10 });

      const tracks = [];
      searchResult.body.tracks.items.map((item) => {
        const track = {};
        track["name"] = item.name;
        track["uri"] = item.uri;
        track["duration_ms"] = convertMsToMinutesSeconds(item.duration_ms);
        track["artist"] = item.album.artists[0].name;
        track["album"] = item.album.name;
        track["image"] = item.album.images[0].url;

        tracks.push(track);
      });
      res.send(tracks);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const playlistId = req.params.id;
      const categoryId = req.body.category;
      await pool.query(
        `
      DELETE FROM categories_playlists 
      WHERE playlist_id = $1 AND category_id = $2`,
        [playlistId, categoryId]
      );
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  router.post("/add-to-category", (req, res) => {
    return pool
      .query(`SELECT id FROM playlists WHERE spotify_id = $1`, [req.body.playlistId])
      .then((data) => {
        const playlistId = data.rows[0].id;
        const categoryId = req.body.categoryId;
        return pool.query(
          `
          INSERT INTO categories_playlists (playlist_id, category_id) 
          SELECT $1, $2
          WHERE NOT EXISTS
          (
            SELECT *
            FROM categories_playlists
            WHERE playlist_id = $1 AND category_id = $2
          )`,
          [playlistId, categoryId]
        );
      })
      .then((data) => {
        if (data.rowCount === 0) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  });

  // Its a post route to add songs to an existing playlist
  // It receives playlist_id and track id in the body of the request
  router.post("/:id", async (req, res) => {
    try {
      const playlistId = req.body.playlistId;
      const track = req.body.track;

      const id = await pool.query(
        `
    SELECT spotify_id FROM playlists WHERE id = $1`,
        [playlistId]
      );
      const spotifyId = id.rows[0].spotify_id;
      await spotifyApi.addTracksToPlaylist(spotifyId, track);
      const playlistData = await spotifyApi.getPlaylist(spotifyId);
      const playlistUpdatedData = [
        playlistData.body.images[0].url,
        playlistData.body.owner.display_name,
        playlistData.body.name,
        playlistData.body.description,
        playlistData.body.tracks.total,
        playlistData.body.tracks.href,
      ];
      await updatePlaylist(playlistId, playlistUpdatedData);
      const playlist = [];
      playlistData.body.tracks.items.map((song) => {
        let duration = convertMsToMinutesSeconds(song.track.duration_ms);
        playlist.push({
          image: song.track.album.images[2].url,
          name: song.track.name,
          album: song.track.album.name,
          artist: song.track.album.artists[0].name,
          releaseDate: song.track.album.release_date,
          duration: duration,
        });
      });
      res.send(playlist);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  router.delete("/track", (req, res) => {
    console.log("yes")
    // try {
    //   const tracksResult = [];
    //   const albumId = req.body.albumId
    //   const tracks = req.body.deleteSongs

    //   // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@', req.body.albumId)

    //   // tracks.forEach(track => {
    //   //   tracksResult.push({ uri: `spotify:track:${track}` })
    //   // })
    //   // // spotifyApi.removeTracksFromPlaylist(playlistId, tracks)

    // } catch (err) {
    //   console.log(err);
    //   res.sendStatus(500)
    // }
  })


  router.delete("/:id", async (req, res) => {
    try {
      const playlistId = req.params.id;
      await pool.query(
        `
      DELETE FROM categories_playlists 
      WHERE playlist_id = $1`,
        [playlistId]
      );
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  return router;
};
