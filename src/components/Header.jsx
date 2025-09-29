import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cadastro">Cadastro</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/principal">Principal</Link></li>
        </ul>
      </nav>
    </header>
  );
}
