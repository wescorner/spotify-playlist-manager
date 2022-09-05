// routeto one category
// will have data of all the playlists under the category

const express = require('express');
const router = express.Router();
const { spotifyApi } = require('../app')
require("dotenv").config()

module.exports = (pool) => {

  // router.post("/", (req, res) => {
  //   return pool.query(`INSERT INTO categories (name, image, user_id) VALUES ($1, $2, $3)`, profileInfo)
  // })

  return router
};