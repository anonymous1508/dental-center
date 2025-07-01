import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const RequireRole = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Add this check to prevent crash
  if (!allowedRoles || !Array.isArray(allowedRoles)) {
    console.error("RequireRole: allowedRoles is missing or invalid");
    return <Navigate to="/login" replace />;
  }

  // If logged in but role not allowed, redirect
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  // Role is allowed — render children
  return children;
};

export default RequireRole;

