import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const p = JSON.parse(localStorage.getItem("patients")) || [];
    const a = JSON.parse(localStorage.getItem("incidents")) || [];

    const sorted = a.sort(
      (x, y) => new Date(x.appointmentDate) - new Date(y.appointmentDate)
    );

    setAppointments(sorted);
    setPatients(p);
  }, []);

  const totalRevenue = appointments.reduce(
    (sum, a) => sum + Number(a.cost || 0),
    0
  );

  const completed = appointments.filter((a) => a.status === "Completed").length;
  const pending = appointments.filter((a) => a.status !== "Completed").length;

  const getPatientName = (id) => {
    return patients.find((p) => p.id === id)?.name || "Unknown";
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Topbar />
      <h2>Admin Dashboard</h2>

      {/* KPIs */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <KPI title="Total Patients" value={patients.length} />
        <KPI title="Completed Treatments" value={completed} />
        <KPI title="Pending Treatments" value={pending} />
        <KPI title="Revenue Collected" value={`₹${totalRevenue}`} />
      </div>

      {/* Next Appointments */}
      <h3>Upcoming Appointments</h3>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <ul>
          {appointments.slice(0, 10).map((a) => (
            <li key={a.id} style={{ marginBottom: "1rem" }}>
              <strong>{a.title}</strong> — {getPatientName(a.patientId)} <br />
              {new Date(a.appointmentDate).toLocaleString()} | ₹{a.cost} | {a.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const KPI = ({ title, value }) => (
  <div
    style={{
      border: "1px solid #ccc",
      padding: "1rem",
      borderRadius: "5px",
      width: "200px",
      background: "#f4f6f8",
    }}
  >
    <h4 style={{ margin: 0 }}>{title}</h4>
    <p style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>{value}</p>
  </div>
);

export default Dashboard;
