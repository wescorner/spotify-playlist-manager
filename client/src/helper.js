export const authEndpoint = "https://accounts.spotify.com/authorize"
const redirect_uri = "http://localhost:3000/"
const client_id = ''


const scopes = ['user-read-private', 'user-read-email', 'ugc-image-upload', 'streaming user-follow-modify', 'user-read-recently-played', 'user-read-playback-position', 'user-top-read', 'playlist-modify-public', 'user-library-modify', 'user-follow-read', 'user-read-currently-playing', 'user-library-read', 'playlist-read-private', 'user-read-private', 'playlist-modify-private'];

export const getTokenFromURL = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      let parts = item.split('=')
      initial[parts[0]] = decodeURIComponent(parts[1])

      return initial
    }, {});
}

export const loginUrl = `${authEndpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`