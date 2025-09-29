import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Principal() {
  const { user, logout } = useAuth();
  const [perfil, setPerfil] = useState(null);
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setPerfil(snap.data());
        } else {
          setMsg("Perfil não encontrado no Firestore.");
        }
      } catch (e) {
        console.error(e);
        setMsg("Erro ao carregar os dados do usuário.");
      }
    }
    load();
  }, [user]);

  const sair = async () => {
    await logout();
    nav("/login");
  };

  return (
    <div className="card">
      <h1>Principal</h1>

      {!perfil && !msg && <p>Carregando perfil...</p>}
      {msg && <p className="msg">{msg}</p>}

      {perfil && (
        <div className="perfil">
          <p><strong>Nome:</strong> {perfil.nome}</p>
          <p><strong>Sobrenome:</strong> {perfil.sobrenome}</p>
          <p><strong>Data de nascimento:</strong> {perfil.dataNasc}</p>
        </div>
      )}

      <button onClick={sair} style={{ marginTop: 16 }}>Sair</button>
    </div>
  );
}
