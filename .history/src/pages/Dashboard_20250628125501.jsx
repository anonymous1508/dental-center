// src/pages/Dashboard.jsx
import React from "react";
import Topbar from "../components/Topbar";

const Dashboard = () => {
  return (
    <div className="container">
      <Topbar />
      <h2>Admin Dashboard</h2>
      <div className="card">
        <p>Welcome to the dental center management system.</p>
        <p>Here you’ll see KPIs like appointments, revenue, top patients, etc.</p>
      </div>
    </div>
  );
};

export default Dashboard;
