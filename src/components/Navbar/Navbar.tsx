import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Всі рецепти
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/favorites" className="nav-link">
            Улюблені рецепти
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
