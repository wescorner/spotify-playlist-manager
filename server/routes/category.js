// routeto one category
// will have data of all the playlists under the category

const express = require('express');
const router = express.Router();
const { spotifyApi } = require('../app')
require("dotenv").config()

module.exports = (pool) => {

  router.get('/', (req, res) => {
    spotifyApi.getMe()
      .then(data => {
        console.log(data)
      })
  })

  // Checks that the current user exists and adds a category to their database using req.body(categoryName, categoryImage)

  router.post("/", (req, res) => {
    const categoryInfo = []
    categoryInfo.push(req.body.categoryName)
    categoryInfo.push(req.body.categoryImage)

    spotifyApi.getMe()
      .then(data => {
        return pool.query(`SELECT id FROM users WHERE spotify_id = $1`, [data.body.id])
          .then(data => {
            categoryInfo.push(data.rows[0])
            return pool.query(`INSERT INTO categories (name, image, user_id) VALUES ($1, $2, $3)`, [categoryInfo])
          })
          .catch(err => {
            res.send('Invalid or expired token, please login again')
          })
      })


    // return pool.query(`INSERT INTO categories (name, image, user_id) VALUES ($1, $2, $3)`, profileInfo)
  })

  return router
};