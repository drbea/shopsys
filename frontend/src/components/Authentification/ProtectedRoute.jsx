// components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import UseAuth from "./UseAuth";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = UseAuth();

  if (loading) return <div>Chargement...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;



