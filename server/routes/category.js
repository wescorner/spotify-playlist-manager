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
    const categoryInformation = []
    spotifyApi.getMe()
      .then(data => {
        return pool.query(`SELECT id FROM users WHERE spotify_id = $1`, [data.body.id])
          .then(data => {
            return pool.query(
              `SELECT categories.id, categories.description, categories.name, categories.image, categories.user_id, COUNT(playlist_id) 
            FROM categories LEFT JOIN categories_playlists ON categories.id = categories_playlists.category_id
            WHERE user_id = $1
            GROUP BY categories.description, categories.name, categories.image, categories.id, categories.user_id
            `, [data.rows[0].id])
              .then(data => {
                res.json(data.rows)
              })
          })

      })
      .catch(err => {
        console.log(err)
        if (err.body.error.message === 'No token provided') {
          return res.redirect('/login')
        }
        res.sendStatus(500)
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
            return pool.query(`INSERT INTO categories (name, image, description, user_id) VALUES ($1, $2, $3, $4)`, categoryInfo)
              .then(data => {
                res.sendStatus(200)
              })
              .catch(err => {
                console.log(err)
              })
          })
      })
  })

  router.delete("/:id", (req, res) => {
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