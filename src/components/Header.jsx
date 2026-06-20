import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { dark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      {/* Logo */}
      <div className="header-left">
        <Link to="/" className="xeus-animated" style={{ fontSize: '2rem', textDecoration: 'none' }}>
          QGen
        </Link>
      </div>

      {/* Navigation – only show main links when logged in */}
      <nav className="header-nav">
        {user ? (
          <>
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/upload"
              className={`nav-link ${location.pathname === '/upload' ? 'active' : ''}`}
            >
              Upload
            </Link>
            <Link
              to="/generate"
              className={`nav-link ${location.pathname === '/generate' ? 'active' : ''}`}
            >
              Generate
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}
            >
              Register
            </Link>
          </>
        )}
      </nav>

      {/* Right side: user info / logout + theme toggle */}
      <div className="header-right">
        {user && (
          <>
            <span className="greeting">👤 {user.username}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}

        {/* Theme toggle switch (always visible) */}
        <div
          className={`theme-toggle ${dark ? 'dark' : 'light'}`}
          onClick={toggleTheme}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && toggleTheme()}
        >
          <div className="toggle-track">
            <div className="toggle-icons">
              <span className="toggle-icon sun">☀️</span>
              <span className="toggle-icon moon">🌙</span>
            </div>
            <div className="toggle-thumb" />
          </div>
        </div>
      </div>
    </header>
  );
}