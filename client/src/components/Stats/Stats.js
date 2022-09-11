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
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useParams } from "react-router-dom"
import AudiotrackIcon from "@material-ui/icons/Audiotrack";
import ReplayIcon from '@material-ui/icons/Replay';
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Stats() {

  const { id } = useParams()
  const [dashboardStats, setDashboardStats] = useState({})
  const [favourite, setFavourite] = useState([])
  const [playlistInfo, setPlaylistInfo] = useState([])

  useEffect(() => {
    const songList = [];
    const playCountList = [];
    axios.get(`/playlist/${id}`)
      .then(res => {
        setPlaylistInfo([res.data.name, res.data.image])
        res.data.tracks.forEach(track => {
          songList.push(track.name)
          playCountList.push(track.playCount)
        })
        setFavourite([res.data.tracks[0].name, res.data.tracks[0].playCount])
        setDashboardStats(prev => ({
          ...prev, songList, playCountList
        }))
      })
  }, [])

  console.log(dashboardStats)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          display: false,
          color: "white",
          font: {
            size: 18
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          color: "grey",
          font: {
            size: 15,
          },
          stepSize: 1,
          beginAtZero: true
        }
      },
      x: {
        ticks: {
          color: "grey",
          font: {
            size: 20
          },
          stepSize: 1,
          beginAtZero: true
        }
      }
    },
  };

  const labels = dashboardStats.songList;

  const data = {
    labels,
    datasets: [
      {
        label: 'Number of plays per song',
        data: dashboardStats.playCountList,
        backgroundColor: 'rgba(30, 215, 96, 0.5)',
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
            <h1 className='playlistTitle'>{playlistInfo[0]}</h1>
            <img id="playlistImage" src={playlistInfo[1]} alt="playlistImage" />
          </div>
          <div className="flexColumn">
            <p><AudiotrackIcon className="svg_icons" />Most Played Song: {favourite[0]}</p>
            <p><ReplayIcon className="svg_icons" />Number of Plays: {favourite[1]}</p>
          </div>
        </div>
        <div id="buttonContainer">
          <button type="button" className="btn btn-danger" onClick={() => console.log('clicked')}>DELETE SONGS FROM PLAYLIST THAT ARE NOT PART OF YOUR TOP TRACKS</button>
        </div>
        <h1 id="graphTitle">Most Listened to Songs</h1>
        <Bar options={options} data={data} />;
      </div>
    </div>
  );
}