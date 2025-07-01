import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Component to protect routes based on role
const RequireRole = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Role not authorized
    return <Navigate to="/login" />;
  }

  // Authorized
  return children;
};

export default RequireRole;
