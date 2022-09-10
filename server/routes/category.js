// routeto one category
// will have data of all the playlists under the category

const express = require("express");
const router = express.Router();
const { spotifyApi } = require("../app");
require("dotenv").config();

module.exports = (pool) => {
  // Find out who the current user is and grab all their category data from the database
  router.get("/:id", (req, res) => {
    spotifyApi.getMe().then((data) => {
      return pool
        .query("SELECT id FROM users WHERE spotify_id = $1", [data.body.id])
    })
    .then((data) => {
      return pool.query(
        `SELECT playlists.id AS playlist_id, playlists.name AS playlist_name, playlists.spotify_id, playlists.image AS playlist_img, playlists.owner AS playlist_owner, playlists.description AS playlist_desc, playlists.total_tracks, playlists.tracks, categories.name AS category_name, categories.description AS category_desc, categories.image AS category_img FROM playlists
        FULL OUTER JOIN categories_playlists ON playlists.id = categories_playlists.playlist_id
        FULL OUTER JOIN categories ON categories_playlists.category_id = categories.id
        FULL OUTER JOIN users ON categories.user_id = users.id
        WHERE categories.id = $1 AND users.id = $2`,
        [req.params.id, data.rows[0].id]
      );
    })
    .then((data) => {
      return res.json(data.rows);
    })
    .catch((error) => {
      console.log(error)
      return res.sendStatus(500)
    })
  });

  router.get("/", (req, res) => {
    spotifyApi
      .getMe()
      .then((data) => {
        return pool
          .query(`SELECT id FROM users WHERE spotify_id = $1`, [data.body.id]);
      })
      .then((data) => {
        return pool
          .query(
            `SELECT categories.id, categories.description, categories.name, categories.image, categories.user_id, COUNT(playlist_id) 
            FROM categories LEFT JOIN categories_playlists ON categories.id = categories_playlists.category_id
            WHERE user_id = $1
            GROUP BY categories.description, categories.name, categories.image, categories.id, categories.user_id
            `,
            [data.rows[0].id]
          )
      })
      .then((data) => {
        return res.json(data.rows);
      })
      .catch((error) => {
        console.log(error)
        return res.sendStatus(500)
      })
  });

  // Checks that the current user exists and adds a category to their database using req.body(categoryName, categoryImage)

  router.post("/", (req, res) => {
    const categoryInfo = [];
    categoryInfo.push(req.body.categoryName);
    categoryInfo.push(req.body.categoryImage);
    categoryInfo.push(req.body.categoryDescription);

    spotifyApi.getMe().then((data) => {
      return pool
        .query(`SELECT id FROM users WHERE spotify_id = $1`, [data.body.id]);
    })
    .then((data) => {
      categoryInfo.push(data.rows[0].id);
      return pool
        .query(
          `INSERT INTO categories (name, image, description, user_id) VALUES ($1, $2, $3, $4)`,
          categoryInfo
        )
    })
    .then((data) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error)
      return res.sendStatus(500)
    })
  });

  router.delete("/:id", (req, res) => {
    const categoryId = req.params.id;
    spotifyApi.getMe().then((data) => {
      return pool
        .query(`SELECT id FROM users WHERE spotify_id = $1`, [data.body.id])
    })
    .then((data) => {
      return pool.query(`DELETE FROM categories WHERE id = $1 AND user_id = $2`, [
        categoryId,
        data.rows[0].id,
      ])
    }).then(() => res.sendStatus(200))
    .catch((error) => {
      console.log(error)
      return res.sendStatus(500)
    });
  });

  return router;
};
