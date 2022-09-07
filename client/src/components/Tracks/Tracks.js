import Table from 'react-bootstrap/Table';

export default function Tracks({image, name, album, dateAdded, duration}) {
  return (
    <Table responsive>
      <tbody>
        <tr>
          <td><img src={image} width='50' height='50'></img></td>
          <td>{name}</td>
          <td>{album}</td>
          <td>{dateAdded}</td>
          <td>{duration}</td>     
        </tr>
      </tbody>
    </Table>
  );
}
