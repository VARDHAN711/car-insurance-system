import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Insurance System</h1>
      <Link to="/persons">Manage Persons</Link>
      <Link to="/cars">Manage Cars</Link>
      <Link to="/accidents">Manage Accidents</Link>
      <Link to="/owns">Manage Ownerships</Link>
      <Link to="/participated">Manage Participated</Link>
    </div>
  );
}

export default App;
