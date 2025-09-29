import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user, checking } = useAuth();

  if (checking) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
