import Button from "react-bootstrap/Button"
export default function Tracks({image, name, album, releaseDate, duration, url, showAdd, onAdd}) {
  return (
      <tr>
        <td><img src={image} width='50' height='50' alt="cover-art"></img></td>
        <td>{name}</td>
        <td>{album}</td>
        <td>{releaseDate}</td>
        <td>{duration}</td>
        { showAdd && <td><Button onClick= {() => onAdd(url)} variant="success">Add</Button></td>}
      </tr>
  );
}
