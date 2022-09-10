import AddCircleIcon from "@material-ui/icons/AddCircle";
import axios from "axios";
import { useState } from "react";

export default function PlaylistModalCard({ categoryid, id, image, title }) {
  const [add, setAdd] = useState(0);

  const handleAdd = function () {
    console.log("clicked");
    console.log("category id:", categoryid);
    axios
      .post(`/playlist/add/${id}`, {
        category: categoryid,
      })
      .then(() => {
        setAdd((add) => add + 1);
      });
  };
  return (
    <div className="playlistCard">
      <img className="playlistIcon" src={image} alt="icon" />
      <p className="playlistName">{title}</p>
      <div className="addIcon">
        <AddCircleIcon onClick={handleAdd} />
      </div>
    </div>
  );
}
