import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className="topbar"
      style={{
        backgroundColor: "#f5f5f5",
        padding: "10px 20px",
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <strong>ENTNT Dashboard</strong>
        {user?.role === "Admin" && (
          <>
            {" | "}
            <Link to="/dashboard">Dashboard</Link>
            {" | "}
            <Link to="/patients">Patients</Link>
            {" | "}
            <Link to="/appointments">Appointments</Link>
            {" | "}
            <Link to="/calendar">Calendar</Link>
          </>
        )}
        {user?.role === "Patient" && (
          <>
            {" | "}
            <Link to="/patient-portal">My Portal</Link>
          </>
        )}
      </div>
      <button onClick={handleLogout} className="btn">
        Logout
      </button>
    </div>
  );
};

export default Topbar;
