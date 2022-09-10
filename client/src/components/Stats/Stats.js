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

  const [songs, setSongs] = useState([])
  const [playCounts, setPlayCounts] = useState([])
  const [popular, setPopular] = useState([])

  useEffect(() => {
    const songList = [];
    const playCountList = [];
    const popularList = [];
    axios.get(`/playlist/10`)
      .then(res => {
        console.log(res.data)
        res.data.forEach(track => {
          songList.push(track.name)
          setSongs(songList)
          playCountList.push(track.playCount)
          setPlayCounts(playCountList)
          setPopular([res.data[0].name, res.data[0].playCount])
        })
      })
  }, [])

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

  const labels = songs;

  const data = {
    labels,
    datasets: [
      {
        label: 'Number of plays per song',
        data: playCounts,
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
            <h1 className='playlistTitle'>Playlist Name</h1>
            <img id="playlistImage" src='https://thisis-images.scdn.co/37i9dQZF1DZ06evO4vfeYm-large.jpg' alt="playlistImage" />
          </div>
          <div className="flexColumn">
            <p><AudiotrackIcon className="svg_icons" />Most Played Song: {popular[0]} </p>
            <p><ReplayIcon className="svg_icons" />Number of Listens: {popular[1]}</p>
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