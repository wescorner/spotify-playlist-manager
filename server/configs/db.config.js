// Database connections
const { Pool } = require("pg");

const { DB_HOST, DB_USER, DB_PASS, DB_DATABASE, DB_PORT } = process.env;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

pool
  .connect()
  .then(() => {
    console.log("Database connection established.");
  })
  .catch((e) => {
    throw new Error(e);
  });

module.exports = pool;
