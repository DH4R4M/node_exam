import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f8f9fa' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      {user ? (
        <>
          <Link to="/profile" style={{ marginRight: '1rem' }}>Profile</Link>
          <Link to="/add-recipe" style={{ marginRight: '1rem' }}>Add Recipe</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
          <Link to="/register" style={{ marginRight: '1rem' }}>Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar; 