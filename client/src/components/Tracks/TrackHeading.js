import Table from 'react-bootstrap/Table';

export default function TrackHeading() {
  const tableTitle = ["Track", "Album", "Date added", "Duration"]
  return (
    <Table responsive>
      <thead>
        <tr>
        <th></th>
          {tableTitle.map((title, index) => (
            <th key={index}>{title}</th>
          ))}
        </tr>
      </thead>  
    </Table>
  );
}
