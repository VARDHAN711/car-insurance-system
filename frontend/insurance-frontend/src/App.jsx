import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Insurance System</h1>
      <Link to="/persons">Manage Persons</Link> <br />
      <Link to="/cars">Manage Cars</Link><br />
      <Link to="/accidents">Manage Accidents</Link><br />
      <Link to="/owns">Manage Ownerships</Link><br />
      <Link to="/participated">Manage Participated</Link><br />
      <Link to="/update-damage">Update Damage</Link><br />
    </div>
  );
}

export default App;
