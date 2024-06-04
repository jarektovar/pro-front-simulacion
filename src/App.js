import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import MateriasList from "./components/MateriasList";
import EstudiantesList from "./components/EstudiantesList";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark custom-navbar">
          <a href="/tutorials" className="navbar-brand">
          <div><strong>UPTC</strong></div>
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/materias"} className="nav-link">
                Materias
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route exact path="/" element={<MateriasList />} />
            <Route path="/materias" element={<MateriasList />} />
            <Route path="/materias/:idMateria/estudiantes" element={<EstudiantesList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

