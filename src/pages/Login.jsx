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
const loginStyles = `
  .container {
    background: #f7f9fa;
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.07);
    padding: 2.5rem 2rem;
    margin-top: 5rem;
  }
  .card {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
    padding: 2rem 1.5rem;
    border: none;
  }
  label {
    font-weight: 500;
    color: #333;
    margin-bottom: 0.3rem;
    display: block;
  }
  input[type="email"], input[type="password"] {
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 1rem;
    background: #f3f4f6;
    transition: border 0.2s;
  }
  input[type="email"]:focus, input[type="password"]:focus {
    border: 1.5px solid #0077b6;
    outline: none;
    background: #fff;
  }
  .btn {
    background: linear-gradient(90deg, #0077b6 0%, #00b4d8 100%);
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 0.7rem 0;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 0.5rem;
  }
  .btn:hover {
    background: linear-gradient(90deg, #023e8a 0%, #0096c7 100%);
  }
`;

if (typeof document !== "undefined" && !document.getElementById("login-styles")) {
  const style = document.createElement("style");
  style.id = "login-styles";
  style.innerHTML = loginStyles;
  document.head.appendChild(style);
}