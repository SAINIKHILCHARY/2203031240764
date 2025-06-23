import React from "react";
import { Link } from "react-router-dom";
import AppRoutes from "./routes";

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <Link to="/" className="nav-link">Shorten</Link>
        <Link to="/stats" className="nav-link">Statistics</Link>
      </nav>
      <AppRoutes />
    </div>
  );
}

export default App;
