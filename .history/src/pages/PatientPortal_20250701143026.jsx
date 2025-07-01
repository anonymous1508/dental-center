import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import { getIncidents, addIncident } from "../utils/incidentStorage";

const PatientPortal = () => {
  const { user, logout } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [newIncident, setNewIncident] = useState({
    title: "",
    description: "",
    appointmentDate: "",
  });

  useEffect(() => {
    if (user?.patientId) {
      const all = getIncidents();
      const userIncidents = all.filter((i) => i.patientId === user.patientId);
      setIncidents(userIncidents);
    }
  }, [user]);

  const handleChange = (e) => {
    setNewIncident({ ...newIncident, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const incident = {
      id: Date.now().toString(),
      ...newIncident,
      patientId: user.patientId,
      status: "Pending",
      cost: 0,
      treatment: "",
      nextDate: "",
      files: [],
    };
    addIncident(incident);
    setIncidents([...incidents, incident]);
    setNewIncident({ title: "", description: "", appointmentDate: "" });
  };

  // ✅ Hardcoded Profile Info based on Email
  const getProfile = () => {
    if (user?.email === "john@entnt.in") {
      return {
        name: "John Doe",
        dob: "1990-05-10",
        contact: "1234567890",
        healthInfo: "No allergies",
      };
    }
    return null;
  };

  const profile = getProfile();

  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <h2>ENTNT Dashboard | My Portal</h2>

        <h3 style={{ marginTop: "2rem" }}>My Dental Portal</h3>
        {!profile ? (
          <p style={{ color: "red" }}>Profile not found.</p>
        ) : (
          <ul>
            <li><strong>Name:</strong> {profile.name}</li>
            <li><strong>DOB:</strong> {profile.dob}</li>
            <li><strong>Contact:</strong> {profile.contact}</li>
            <li><strong>Health Info:</strong> {profile.healthInfo}</li>
          </ul>
        )}

        <h3 style={{ marginTop: "2rem" }}>Appointment History</h3>
        {incidents.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <ul>
            {incidents.map((i) => (
              <li key={i.id} style={{ marginBottom: "1rem" }}>
                <strong>Title:</strong> {i.title}<br />
                <strong>Date:</strong> {new Date(i.appointmentDate).toLocaleString()}<br />
                <strong>Status:</strong> {i.status}<br />
                <strong>Cost:</strong> ₹{i.cost}<br />
                <strong>Treatment:</strong> {i.treatment}<br />
                <strong>Next Visit:</strong> {i.nextDate}
              </li>
            ))}
          </ul>
        )}

        <hr />

        <h3>Book a New Appointment</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={newIncident.title}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={newIncident.description}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
            />
          </div>
          <div>
            <label>Appointment Date & Time:</label>
            <input
              type="datetime-local"
              name="appointmentDate"
              value={newIncident.appointmentDate}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
            />
          </div>
          <button type="submit">Submit Appointment</button>
        </form>
      </div>
    </>
  );
};

export default PatientPortal;
