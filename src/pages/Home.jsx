import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="card">
      <h1>Tecnologias para Desenvolvimento Web</h1>

      <p>Escolha uma das páginas do projeto:</p>
      <ul style={{ lineHeight: 1.9 }}>
        <li><Link to="/cadastro">Cadastro</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/principal">Principal</Link></li>
      </ul>

      <hr style={{ margin: "16px 0" }} />

      <p className="muted">
        Dica: a página Principal exige usuário autenticado.
      </p>
    </div>
  );
}
