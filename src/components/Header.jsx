import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { dark, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <header className="app-header">
      <div className="header-left">
        <Link to="/" className="xeus-animated" style={{ fontSize: '2rem', textDecoration: 'none' }}>
          QGen
        </Link>
      </div>

      <nav className="header-nav">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
          Home
        </Link>
        <Link to="/upload" className={`nav-link ${location.pathname === '/upload' ? 'active' : ''}`}>
          Upload
        </Link>
        <Link to="/generate" className={`nav-link ${location.pathname === '/generate' ? 'active' : ''}`}>
          Generate
        </Link>
      </nav>

      <div className="header-right">
        {/* Theme toggle switch */}
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