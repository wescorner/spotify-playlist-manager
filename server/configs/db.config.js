// Database connections
const { Pool } = require("pg");

const { DB_HOST, DB_USER, DB_PASS, DB_DATABASE, DB_PORT } = process.env;

let pool;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL || "",
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
  });
} else {
  pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASS,
    port: DB_PORT,
    database: DB_DATABASE,
  });
}

pool
  .connect()
  .then(() => {
    console.log("Database connection established.");
  })
  .catch((e) => {
    throw new Error(e);
  });

module.exports = pool;
