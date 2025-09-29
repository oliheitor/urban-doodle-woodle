import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Cadastro() {
  const [form, setForm] = useState({
    email: "",
    senha: "",
    nome: "",
    sobrenome: "",
    dataNasc: "" // yyyy-mm-dd
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      // 1) Cria usuário no Auth (Email/Senha)
      const cred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.senha
      );
      const uid = cred.user.uid;

      // 2) Salva dados no Firestore, incluindo UID
      await setDoc(doc(db, "users", uid), {
        uid,
        email: form.email,
        nome: form.nome,
        sobrenome: form.sobrenome,
        dataNasc: form.dataNasc,
        createdAt: serverTimestamp()
      });

      setMsg("Usuário cadastrado com sucesso!");
      // opcional: ir direto para principal
      nav("/principal");
    } catch (err) {
      console.error(err);
      setMsg("Erro ao cadastrar usuário. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h1>Cadastro</h1>
      <form onSubmit={onSubmit} className="form">
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={onChange}
          required
          minLength={6}
        />
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={onChange}
          required
        />
        <input
          type="text"
          name="sobrenome"
          placeholder="Sobrenome"
          value={form.sobrenome}
          onChange={onChange}
          required
        />
        <input
          type="date"
          name="dataNasc"
          placeholder="Data de nascimento"
          value={form.dataNasc}
          onChange={onChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>

      {msg && <p className="msg">{msg}</p>}

      <p className="muted">
        Já possui conta? <Link to="/login">Fazer login</Link>
      </p>
    </div>
  );
}
