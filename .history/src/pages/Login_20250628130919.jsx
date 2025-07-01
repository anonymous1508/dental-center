import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login form submitted");
    const success = login(email, password);
    console.log("Login success:", success);

    if (success) {
      const loggedInUser = JSON.parse(localStorage.getItem("authUser"));
      if (loggedInUser.role === "Admin") {
        navigate("/dashboard");
      } else if (loggedInUser.role === "Patient") {
        navigate("/patient-portal");
      }
    } else {
      setError("INVALID CREDENTIALS");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h2>
      <form onSubmit={handleSubmit} className="card">
        <div>
          <label>Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
        </div>
        {error && (
          <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
        )}
        <button type="submit" className="btn" style={{ width: "100%" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
