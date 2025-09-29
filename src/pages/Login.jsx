import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      nav("/principal");
    } catch (err) {
      console.error(err);
      setMsg("Usuário não cadastrado ou credenciais inválidas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h1>Login</h1>
      <form onSubmit={onSubmit} className="form">
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Acessando..." : "Acessar"}
        </button>
      </form>

      {msg && <p className="msg">{msg}</p>}

      <p className="muted">
        Não possui conta? <Link to="/cadastro">Cadastre-se</Link>
      </p>
    </div>
  );
}
