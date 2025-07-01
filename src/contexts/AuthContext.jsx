import React, { createContext, useContext, useState, useEffect } from "react";

// Dummy users for simulation
const users = [
  { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
  { id: "2", role: "Patient", email: "john@entnt.in", password: "patient123", patientId: "p1" }
];

// 1. Create Context
const AuthContext = createContext();

// 2. Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = (email, password) => {
    const match = users.find(
      (u) => u.email === email && u.password === password
    );
    if (match) {
      setUser(match);
      localStorage.setItem("authUser", JSON.stringify(match));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ 3. Custom hook (MISSING in your file)
export const useAuth = () => useContext(AuthContext);
