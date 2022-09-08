DROP TABLE IF EXISTS playlists CASCADE;

CREATE TABLE playlists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  spotify_id VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  owner VARCHAR(255),
  description text,
  total_tracks INTEGER,
  tracks VARCHAR(255),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);