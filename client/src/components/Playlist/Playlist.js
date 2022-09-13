import React, { useEffect, useState } from "react";
import PlaylistHead from "../PlaylistHead/PlaylistHead";
import TrackHeading from "../Tracks/TrackHeading";
import Track from "../Tracks/Tracks";
import Table from "react-bootstrap/Table";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import AddTracks from "../AddTracks/Addtracks";
const Playlist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playList, setPlayList] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    axios.get(`/playlist/${id}`).then(({ data: playlist }) => setPlayList(playlist));
  }, [id, showAddModal]);

  const tracks = playList.tracks?.map((track, index) => (
    <Track
      key={index}
      name={track.name}
      album={track.album}
      releaseDate={track.releaseDate}
      duration={track.duration}
      image={track.image}
    />
  ));
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
          image={
            playList.image
              ? playList.image
              : "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999"
          }
          owner={playList.owner}
          totalSongs={playList.tracks?.length}
          onPlay={() => window.open(playList.spotifyURL, "_blank").focus()}
          onDashboard={() => navigate(`/stats/${id}`)}
          onAddClicked={() => setShowAddModal(true)}
        />
        <Table style={{ overflowY: "auto" }}>
          <TrackHeading />
          <tbody style={{ color: "white", overflowY: "auto", maxHeight: "100%" }}>{tracks}</tbody>
        </Table>
      </div>
      <AddTracks show={showAddModal} playlistId={id} onHide={() => setShowAddModal(false)} />
    </div>
  );
};

export default Playlist;
