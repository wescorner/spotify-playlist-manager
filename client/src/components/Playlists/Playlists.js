import PlaylistCard from "../PlaylistCard/PlaylistCard"
import axios from "axios"
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import { useEffect, useState } from "react";

export default function Playlists () {

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    axios
      .get(`/playlist/all-by-id`)
      .then((res) => {
        setPlaylists(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setPlaylists]);

  const playlistItems = playlists.map((playlist, key) => {
    const args = {
      id: playlist.id,
      title: playlist.name,
      description: playlist.description,
      image:
        playlist.image || "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999",
    };
    return <PlaylistCard hideDeleteIcon = {true} className="playlistItem" key={key} {...args} />;
  });
  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Header />
        <div className="categoriesTitle">
          <h1>All Playlists</h1>
        </div>
        <div className="playlists">{playlistItems}</div>
      </div>
    </div>
  )
}