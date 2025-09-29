import React from "react";
import AppRoutes from "./routes.jsx";
import Header from "./components/Header.jsx";

export default function App() {
  return (
    <div>
      <Header />
      <div className="container">
        <AppRoutes />
      </div>
    </div>
  );
}
