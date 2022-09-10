import AddCircleIcon from "@material-ui/icons/AddCircle";
import axios from "axios";

export default function PlaylistModalCard({ category, setCategory, categoryid, id, image, title, onAdd }) {
  const handleAdd = function () {
    axios
      .post(`/playlist/add-to-category`, {
        playlistId: id,
        categoryId: categoryid,
      })
      .then(() => {
        // window.location.href = `/category/${categoryid}`;
        setCategory([...category, {}]);
      });
    onAdd();
  };
  return (
    <div className="playlistCard">
      <img
        className="playlistIcon"
        src={
          image
            ? image
            : "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999"
        }
        alt="icon"
      />
      <p className="playlistName">{title}</p>
      <div className="addIcon">
        <AddCircleIcon onClick={handleAdd} />
      </div>
    </div>
  );
}
