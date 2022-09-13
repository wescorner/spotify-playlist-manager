<h1 align="center">
  <img alt="cgapp logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png" width="224px"/><br/>
  Spotify Playlist Manager
</h1>

<p align="center">Welcome to Spotify Playlist Manager! The all-in-one application to help you <b>manage</b>, <b>categorize</b>, and <b>improve</b> your spotify playlists! You can create categories, add new playlists, edit your existing playlists, and even automatically update your playlists to remove unlistened to songs!</p>

<p align="center">
<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="react" />
<img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="express" />
<img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="postgres" />
<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="node" />
<img src="https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white" alt="spotify" />
</p>

## ⚡️Quickstart
Spotify Playlist Manager is hosted with Heroku and deployed at [spotifyplaylistmanager.com](http://www.spotifyplaylistmanager.com) so click the link and head over to start playlisting!

## 💻Local Setup

### Server

Enter the 'server' folder and install dependencies
```
npm install
```

Initialize the Postgres database
```
npm run db:reset
```

Start the development server
```
npm start
```

### Client

Enter the 'client' folder and install dependencies
```
npm install
```

Start the react application
```
npm start
```

## ⭐️Features

### Create a Category
The home page is where you will view all your created categories, and on the sidebar there is a 'Create a Category' button which lets you create a new category with a given name, image, and description. This category will be displayed on your home page once you create it.

<img src="https://github.com/wescorner/spotify-playlist-manager/blob/main/images/create-category.PNG?raw=true" alt="create-category" />

### Add Playlists to Category
When clicking on a category, you will be taken to the category page. Here, you can edit/delete the category, and add playlists to the category. Clicking the '+' button will bring up a list of ALL playlists on your spotify account, where you can then choose which ones to add to the category. You may also delete playlists from a category once they are added.

<img src="https://github.com/wescorner/spotify-playlist-manager/blob/main/images/add-playlists.PNG?raw=true" alt="add-playlists" />
<img src="https://github.com/wescorner/spotify-playlist-manager/blob/main/images/playlists-added.PNG?raw=true" alt="playlists-added" />

### Create a Playlist
Creating a new playlist is as simple as clicking the 'Create a Playlist' button on the sidebar, which lets you enter a playlist name and description to be created. The playlist image will be auto-created after you populate it with songs.

<img src="https://github.com/wescorner/spotify-playlist-manager/blob/main/images/create-playlist.PNG?raw=true" alt="create-playlist" />

⚠️*Note: This action will create a playlist on your actual spotify account*⚠️

### Edit Existing Playlist
Clicking on a playlist will bring you to the playlist page, where you can edit the playlist information, open the playlist in spotify to be played, or add songs to the playlist. Adding songs to the playlist is done by clicking the 'Add Songs' button, searching for a song you like, and clicking 'Add'.

<img src="https://github.com/wescorner/spotify-playlist-manager/blob/main/images/playlist-info.PNG?raw=true" alt="edit-playlist" />

⚠️*Note: This action will edit playlists on your actual spotify account*⚠️

### View Playlist Stats
Clicking the 'dashboard' button on a playlist's page will bring you to the playlist dashboard, where you can see statistics of your playlist such as most listened to song, number of plays, and all the songs sorted by number of plays.

<img src="https://github.com/wescorner/spotify-playlist-manager/blob/main/images/playlist-dashboard.PNG?raw=true" alt="playlist-stats" />

### Remove songs from playlist that aren't in most listened to
The big red button in the middle of the playlist dashboard will delete any songs off the playlist that aren't in your top 50 listened to songs, so that your playlists always stay fresh!

⚠️*Note: This action will delete songs on your actual spotify account*⚠️
