import { NavLink } from "react-router-dom";

function Navbar({ theme, toggleTheme }) {
  const linkClass = ({ isActive }) =>
    isActive ? "navbar-link navbar-link-active" : "navbar-link";

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-logo">
          Build<span className="navbar-logo-accent">Hub</span> Pro
        </h1>
        <div className="navbar-links">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/add" className={linkClass}>
            Add Project
          </NavLink>
          <NavLink to="/favorites" className={linkClass}>
            ⭐ Favorites
          </NavLink>
          <NavLink to="/profile" className={linkClass}>
            Profile
          </NavLink>
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
