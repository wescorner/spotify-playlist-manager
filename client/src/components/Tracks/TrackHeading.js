export default function TrackHeading() {
  const tableTitle = ["Track", "Album", "Release Date", "Duration"]
  return (
      <thead style={{color:"white"}}>
        <tr>
        <th></th>
          {tableTitle.map((title, index) => (
            <th key={index}>{title}</th>
          ))}
        </tr>
      </thead>
  );
}
