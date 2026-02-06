import './Navbar.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <h2>🍷 LogAnalyzer</h2>
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/about">About</Link>
        <button onClick={() => {
          localStorage.clear();
          logout();
        }}>
          Logout
        </button>
      </div>
    </nav>
  );
}
