import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import "./Stats.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";
import ReplayIcon from "@material-ui/icons/Replay";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Stats() {
  const { id } = useParams();
  const [dashboardStats, setDashboardStats] = useState({});
  const [favourite, setFavourite] = useState([]);
  const [playlistInfo, setPlaylistInfo] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [deleteSongs, setDeleteSongs] = useState([]);

  useEffect(() => {
    const songList = [];
    const playCountList = [];
    const idList = [];

    axios.get(`/dashboard`).then((res) => {
      setTopSongs(res.data);
    });

    axios.get(`/playlist/${id}`).then((res) => {
      setPlaylistInfo([res.data.albumId, res.data.name, res.data.image]);
      res.data.tracks.forEach((track) => {
        songList.push(track.name);
        playCountList.push(track.playCount);
        idList.push(track.id);
      });
      setFavourite([res.data.tracks[0].name, res.data.tracks[0].playCount]);
      setDashboardStats((prev) => ({
        ...prev,
        songList,
        playCountList,
        idList,
      }));
    });
  }, [id]);

  useEffect(() => {
    const getDeleteList = () => {
      const removeSongs = dashboardStats.idList.filter((song) => {
        return !topSongs.includes(song);
      });
      setDeleteSongs(removeSongs);
    };

    setTimeout(getDeleteList, 0);
  }, [dashboardStats.idList, topSongs]);

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`/dashboard/track`, {
        data: {
          albumId: playlistInfo[0],
          deleteSongs,
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          display: false,
          color: "white",
          font: {
            size: 18,
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "grey",
          font: {
            size: 15,
          },
          stepSize: 1,
          beginAtZero: true,
        },
      },
      x: {
        ticks: {
          color: "grey",
          font: {
            size: 20,
          },
          stepSize: 1,
          beginAtZero: true,
        },
      },
    },
  };

  const labels = dashboardStats.songList;

  const data = {
    labels,
    datasets: [
      {
        label: "Number of plays per song",
        data: dashboardStats.playCountList,
        backgroundColor: "rgba(30, 215, 96, 0.5)",
      },
    ],
  };

  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Header />
        <div className="statsHeader">
          <div>
            <h1 className="playlistTitle">{playlistInfo[1]}</h1>
            <img
              id="playlistImage"
              src={
                playlistInfo[2]
                  ? playlistInfo[2]
                  : "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999"
              }
              alt="playlistImage"
            />
          </div>
          <div className="flexColumn">
            <p>
              <AudiotrackIcon className="svg_icons" />
              Most Played Song: {favourite[0]}
            </p>
            <p>
              <ReplayIcon className="svg_icons" />
              Number of Plays: {favourite[1]}
            </p>
          </div>
        </div>
        <div id="buttonContainer">
          <button type="button" className="btn btn-danger" onClick={handleDelete}>
            DELETE SONGS FROM PLAYLIST THAT ARE NOT PART OF YOUR TOP TRACKS
          </button>
        </div>
        <h1 id="graphTitle">Most Listened to Songs</h1>
        <Bar options={options} data={data} />;
      </div>
    </div>
  );
}
