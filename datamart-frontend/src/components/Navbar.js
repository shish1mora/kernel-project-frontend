import React from "react";
import { Link } from "react-router-dom";
import ThemeSelector from "./ThemeSelector";
import { IoIosNuclear } from "react-icons/io";

const Navbar = ({ currentTheme, setTheme, themes }) => {
  return (
    <nav className="navbar">
      <Link to="/">
        <h1 className="navbar-title">
          KERNEL TRACKER
        </h1>
      </Link>
      <div className="links" title="themes">
        <ThemeSelector
          currentTheme={currentTheme}
          setTheme={setTheme}
          themes={themes}
        />
      </div>
      <Link to="/kernel" className="about-link" title="kernel">
        <IoIosNuclear />
      </Link>
    </nav>
  );
};

export default Navbar;
