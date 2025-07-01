import React, { useState, useEffect } from "react";
import Topbar from "../components/Topbar";
import AppointmentForm from "../components/AppointmentForm";
import {
  getIncidents,
  deleteIncident,
  addIncident,
  updateIncident
} from "../utils/incidentStorage";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setAppointments(getIncidents());
  }, []);

  const handleAdd = () => {
    setSelected(null);
    setShowForm(true);
  };

  const handleEdit = (appointment) => {
    setSelected(appointment);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    deleteIncident(id);
    setAppointments(getIncidents());
  };

  const handleSave = (formData) => {
    if (selected) {
      updateIncident(formData);
    } else {
      addIncident(formData);
    }
    setAppointments(getIncidents());
    setShowForm(false);
  };

  return (
    <div className="container">
      <Topbar />
      <h2>Appointment Management</h2>
      <button className="btn" onClick={handleAdd}>+ Add Appointment</button>

      <table style={{ width: "100%", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Title</th>
            <th>Date</th>
            <th>Cost</th>
            <th>Status</th>
            <th>Files</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr><td colSpan="7">No appointments found.</td></tr>
          ) : (
            appointments.map((a) => (
              <tr key={a.id}>
                <td>{a.patientId}</td>
                <td>{a.title}</td>
                <td>{a.appointmentDate?.slice(0, 16).replace("T", " ")}</td>
                <td>{a.cost}</td>
                <td>{a.status}</td>
                <td>
                  {a.files?.map((f, i) => (
                    <a key={i} href={f.url} target="_blank" rel="noreferrer">{f.name}</a>
                  ))}
                </td>
                <td>
                  <button className="btn" onClick={() => handleEdit(a)}>Edit</button>
                  <button className="btn" onClick={() => handleDelete(a.id)} style={{ marginLeft: "0.5rem" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showForm && (
        <AppointmentForm
          selected={selected}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Appointments;

