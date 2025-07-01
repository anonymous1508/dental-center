import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Topbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        background: "#0a3d62",
        padding: "1rem",
        marginBottom: "2rem",
        display: "flex",
        justifyContent: "space-between",
        color: "white",
      }}
    >
      <div>
        <strong>ENTNT Dashboard</strong>
      </div>
      <div>
        {user?.role === "Admin" && (
          <>
            <button onClick={() => navigate("/dashboard")} style={btnStyle}>
              Dashboard
            </button>
            <button onClick={() => navigate("/patients")} style={btnStyle}>
              Patients
            </button>
            <button onClick={() => navigate("/appointments")} style={btnStyle}>
              Appointments
            </button>
            <button onClick={() => navigate("/calendar")} style={btnStyle}>
              Calendar
            </button>
          </>
        )}
        {user?.role === "Patient" && (
          <button onClick={() => navigate("/patient-portal")} style={btnStyle}>
            My Portal
          </button>
        )}
        <button onClick={handleLogout} style={btnStyle}>
          Logout
        </button>
      </div>
    </div>
  );
};

const btnStyle = {
  marginLeft: "1rem",
  padding: "0.4rem 0.8rem",
  background: "#82ccdd",
  color: "black",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default Topbar;
