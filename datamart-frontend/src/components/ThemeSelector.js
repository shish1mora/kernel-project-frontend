import React, { useState, useRef, useEffect } from 'react';
import { IoIosColorPalette } from "react-icons/io";

const ThemeSelector = ({ currentTheme, setTheme, themes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleThemeChange = (theme) => {
    setTheme(theme.className);
    setIsOpen(false);
  };

  return (
    <div className="theme-selector" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="theme-selector-button">
        {/* {themes.find((theme) => theme.className === currentTheme)?.name || 'Select Theme'} */}
        <IoIosColorPalette />
      </button>
      {isOpen && (
        <ul className="theme-selector-dropdown">
          {themes.map((theme) => (
            <li
              key={theme.className}
              className={currentTheme === theme.className ? 'selected' : ''}
              onClick={() => handleThemeChange(theme)}
            >
              {theme.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThemeSelector;
