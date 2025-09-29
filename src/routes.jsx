import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Cadastro from "./pages/Cadastro.jsx";
import Login from "./pages/Login.jsx";
import Principal from "./pages/Principal.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/principal"
        element={
          <ProtectedRoute>
            <Principal />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
