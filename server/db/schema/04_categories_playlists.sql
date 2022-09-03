DROP TABLE IF EXISTS categories_playlists CASCADE;

CREATE TABLE categories_playlists (
  id SERIAL PRIMARY KEY,
  playlist_id INTEGER REFERENCES playlists(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);