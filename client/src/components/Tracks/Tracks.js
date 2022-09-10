export default function Tracks({image, name, album, releaseDate, duration}) {
  return (
      <tr>
        <td><img src={image} width='50' height='50'></img></td>
        <td>{name}</td>
        <td>{album}</td>
        <td>{releaseDate}</td>
        <td>{duration}</td>
      </tr>
  );
}
