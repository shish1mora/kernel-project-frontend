import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Kernhash from "./components/KernelHash";
import Cookies from "js-cookie";

const themes = [
  { name: "Serika", className: "serika-dark-theme" },
  { name: "Red", className: "red-dark-theme" },
  { name: "Light", className: "blue-light-theme" },
  { name: "Gruvbox", className: "gruvbox-dark-theme" },
  { name: "Chaos", className: "chaos-dark-theme" },
  { name: "RosePine", className: "rose-pine-theme" },
  { name: "Matrix", className: "matrix-dark-theme" },
];

function App() {
  const [theme, setTheme] = useState(() => {
    // Загружаем тему из cookies при инициализации, если она есть
    const savedTheme = Cookies.get("theme");
    return savedTheme || "serika-dark-theme";
  });

  useEffect(() => {
    document.documentElement.className = theme;
    // Сохраняем тему в cookies при её изменении
    Cookies.set("theme", theme, { expires: 365 }); // Сохраняем на год
  }, [theme]);

  return (
    <div className="App">
      <Router>
        <Navbar currentTheme={theme} setTheme={setTheme} themes={themes} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kernel" element={<Kernhash />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
