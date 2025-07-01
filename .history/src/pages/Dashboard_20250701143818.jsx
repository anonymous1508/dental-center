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
    <div className="dashboard-root">
      <Topbar />
      <h2 className="dashboard-title">Admin Dashboard</h2>

      {/* KPIs */}
      <div className="dashboard-kpis">
        <KPI title="Total Patients" value={patients.length} />
        <KPI title="Completed Treatments" value={completed} />
        <KPI title="Pending Treatments" value={pending} />
        <KPI title="Revenue Collected" value={`₹${totalRevenue}`} />
      </div>

      {/* Next Appointments */}
      <h3 className="dashboard-section-title">Upcoming Appointments</h3>
      {appointments.length === 0 ? (
        <p className="dashboard-empty">No appointments yet.</p>
      ) : (
        <ul className="dashboard-appointments">
          {appointments.slice(0, 10).map((a) => (
            <li key={a.id} className="dashboard-appointment-item">
              <strong>{a.title}</strong> — {getPatientName(a.patientId)} <br />
              {new Date(a.appointmentDate).toLocaleString()} | ₹{a.cost} | {a.status}
            </li>
          ))}
        </ul>
      )}
      <style>{`
        .dashboard-root {
          padding: 2rem;
          background: linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%);
          min-height: 100vh;
          font-family: 'Segoe UI', Arial, sans-serif;
        }
        .dashboard-title {
          color: #2d3a4b;
          font-size: 2.2rem;
          margin-bottom: 1.5rem;
          letter-spacing: 1px;
        }
        .dashboard-kpis {
          display: flex;
          gap: 2rem;
          margin-bottom: 2.5rem;
          justify-content: flex-start;
          flex-wrap: wrap;
        }
        .dashboard-section-title {
          color: #3a506b;
          margin-bottom: 1rem;
          margin-top: 2rem;
          font-size: 1.3rem;
          letter-spacing: 0.5px;
        }
        .dashboard-empty {
          color: #888;
          font-style: italic;
        }
        .dashboard-appointments {
          list-style: none;
          padding: 0;
          margin: 0;
          max-width: 600px;
        }
        .dashboard-appointment-item {
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(44, 62, 80, 0.07);
          padding: 1rem 1.5rem;
          margin-bottom: 1.2rem;
          border-left: 5px solid #5fa8d3;
          transition: box-shadow 0.2s;
        }
        .dashboard-appointment-item:hover {
          box-shadow: 0 4px 16px rgba(44, 62, 80, 0.13);
          border-left: 5px solid #3a506b;
        }
      `}</style>
    </div>
  );
};

const KPI = ({ title, value }) => (
  <div className="dashboard-kpi">
    <h4 className="dashboard-kpi-title">{title}</h4>
    <p className="dashboard-kpi-value">{value}</p>
    <style>{`
      .dashboard-kpi {
        border: none;
        padding: 1.2rem 1.5rem;
        border-radius: 12px;
        width: 200px;
        background: linear-gradient(120deg, #f4f6f8 60%, #e0eafc 100%);
        box-shadow: 0 2px 8px rgba(44, 62, 80, 0.07);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        transition: box-shadow 0.2s;
      }
      .dashboard-kpi:hover {
        box-shadow: 0 4px 16px rgba(44, 62, 80, 0.13);
      }
      .dashboard-kpi-title {
        margin: 0 0 0.5rem 0;
        color: #5fa8d3;
        font-size: 1.1rem;
        font-weight: 500;
        letter-spacing: 0.5px;
      }
      .dashboard-kpi-value {
        font-size: 2rem;
        font-weight: bold;
        margin: 0;
        color: #2d3a4b;
      }
    `}</style>
  </div>
);

export default Dashboard;
