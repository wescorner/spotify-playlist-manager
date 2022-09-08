import React from "react";
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
import PersonIcon from "@material-ui/icons/Person"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
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

const labels = ['Song 1', 'Song 2', 'Song 3', 'Song 4', 'Song 5', 'Song 6', 'Song 7',];

export const data = {
  labels,
  datasets: [
    {
      label: 'Number of plays per song',
      data: [535, 432, 421, 327, 315, 245, 244],
      backgroundColor: 'rgba(30, 215, 96, 0.5)',
    },
  ],
};


export default function Stats() {
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
          <div class="flexColumn">
            <p><AudiotrackIcon className="svg_icons" />Most Played Song:</p>
            <p><PersonIcon className="svg_icons" />Most Popular Artist:</p>
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