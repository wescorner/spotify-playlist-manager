// routeto one category
// will have data of all the playlists under the category

const express = require('express');
const router = express.Router();
const { spotifyApi } = require('../app')
require("dotenv").config()

module.exports = (pool) => {

  // Find out who the current user is and grab all their category data from the database
  router.get('/:id', (req, res) => {
    spotifyApi.getMe()
      .then(data => {
        return pool.query('SELECT id FROM users WHERE spotify_id = $1', [data.body.id])
          .then(data => {
            return pool.query
              (`SELECT playlists.name, playlists.spotify_id, playlists.image, playlists.owner, playlists.description, playlists.total_tracks, playlists.tracks FROM playlists
            JOIN categories_playlists ON playlists.id = categories_playlists.playlist_id
            JOIN categories ON categories_playlists.category_id = categories.id
            JOIN users ON categories.user_id = users.id
            WHERE categories_playlists.category_id = $1 AND playlists.user_id = $2`, [req.params.id, data.rows[0].id])
          })
          .then(data => {
            res.json(data.rows)
          })
          .catch(err => {
            console.log(err)
          })
      })
  })

  router.get("/", (req, res) => {
    spotifyApi.getMe()
      .then(data => {
        return pool.query(`SELECT id FROM users WHERE spotify_id = $1`, [data.body.id])
          .then(data => {
            return pool.query(`SELECT * FROM categories WHERE user_id = $1`, [data.rows[0].id])
              .then(data => {
                res.json(data.rows)
              })
          })
      })
  })

  // Checks that the current user exists and adds a category to their database using req.body(categoryName, categoryImage)

  router.post("/", (req, res) => {
    const categoryInfo = []
    categoryInfo.push(req.body.categoryName)
    categoryInfo.push(req.body.categoryImage)
    categoryInfo.push(req.body.categoryDescription)

    spotifyApi.getMe()
      .then(data => {
        return pool.query(`SELECT id FROM users WHERE spotify_id = $1`, [data.body.id])
          .then(data => {
            categoryInfo.push(data.rows[0].id)
            return pool.query(`INSERT INTO categories(name, image, description, user_id) VALUES($1, $2, $3, $4)`, [categoryInfo])
          })
          .catch(err => {
            res.send('Invalid or expired token, please login again')
          })
      })
  })

  router.delete("/id", (req, res) => {
    const categoryId = req.params.id
    spotifyApi.get()
      .then(data => {
        return pool.query(`SELECT id FROM users WHERE spotify_id = $1`, [data.body.id])
          .then(data => {
            return pool.query(`DELETE FROM categories WHERE id = $1 AND users_id = $2`, [categoryId, data.rows[0].id])
          })
      })
  })

  return router
};