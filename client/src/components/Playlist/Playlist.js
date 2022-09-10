import React, {useEffect, useState} from "react";
import PlaylistHead from "../PlaylistHead/PlaylistHead"
import TrackHeading from "../Tracks/TrackHeading"
import Track from "../Tracks/Tracks"
import Table from 'react-bootstrap/Table';
import {useParams, useNavigate} from "react-router-dom"
import axios from "axios"
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
const Playlist = () => {
  const {id} = useParams()
  const navigate = useNavigate();
  const [playList, setPlayList] = useState({})

  useEffect(() => {
    axios.get(`/playlist/${id}`)
      .then(({data: playlist}) => setPlayList(playlist));
  }, [id])

  const tracks = playList.tracks?.map(
    (track, index) =>
      <Track
        key={index}
        name={track.name}
        album={track.album}
        releaseDate={track.releaseDate}
        duration={track.duration}
        image={track.image}
      />
  )
  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Header />
        <PlaylistHead
          name={playList.name}
          description={playList.description}
          image={playList.image}
          owner={playList.owner}
          totalSongs={playList.tracks?.length}
          onPlay={() => window.open(playList.spotifyURL, '_blank').focus()}
          onDashboard={() => navigate(`/stats/${id}`)}
        />
        <Table style={{overflowY: "auto"}}>
          <TrackHeading/>
          <tbody style={{color: "white", overflowY: "auto", maxHeight: "100%"}}>
            {tracks}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Playlist