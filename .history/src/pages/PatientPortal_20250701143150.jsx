import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import { useAuth } from "../contexts/AuthContext";

const PatientPortal = () => {
  const { user } = useAuth();
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!user?.patientId) return;

    const allPatients = JSON.parse(localStorage.getItem("patients")) || [];
    const allIncidents = JSON.parse(localStorage.getItem("incidents")) || [];

    const currentPatient = allPatients.find((p) => p.id === user.patientId);
    const myAppointments = allIncidents.filter(
      (i) => i.patientId === user.patientId
    );

    setPatient(currentPatient);
    setAppointments(myAppointments);
  }, [user]);

  const handleBookAppointment = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const datetime = e.target.datetime.value;

    const newAppointment = {
      id: Date.now().toString(),
      patientId: user.patientId,
      title,
      description,
      appointmentDate: datetime,
      status: "Pending",
      cost: 0,
      treatment: "",
      nextDate: "",
      comments: "",
      files: [],
    };

    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);

    const existing = JSON.parse(localStorage.getItem("incidents")) || [];
    localStorage.setItem("incidents", JSON.stringify([...existing, newAppointment]));

    e.target.reset();
    alert("Appointment booked successfully!");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Topbar />
      <h2>ENTNT Dashboard | My Portal</h2>

      <h3>My Dental Portal</h3>
      {!patient ? (
        <p style={{ color: "red" }}>Profile not found.</p>
      ) : (
        <div style={{ marginBottom: "2rem" }}>
          <p><strong>Name:</strong> John</p>
          <p><strong>DOB:</strong> {patient.dob}</p>
          <p><strong>Contact:</strong> {patient.contact}</p>
          <p><strong>Health Info:</strong> {patient.healthInfo}</p>
        </div>
      )}

      <h3>Appointment History</h3>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul>
          {appointments.map((a) => (
            <li key={a.id} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
              <p><strong>Title:</strong> {a.title}</p>
              <p><strong>Date:</strong> {new Date(a.appointmentDate).toLocaleString()}</p>
              <p><strong>Status:</strong> {a.status}</p>
              <p><strong>Cost:</strong> ₹{a.cost}</p>
              <p><strong>Treatment:</strong> {a.treatment}</p>
              <p><strong>Next Visit:</strong> {a.nextDate}</p>
              {a.files?.length > 0 && (
                <>
                  <p><strong>Files:</strong></p>
                  <ul>
                    {a.files.map((file, idx) => (
                      <li key={idx}>
                        <a href={file.url} target="_blank" rel="noreferrer">{file.name}</a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      <h3>Book a New Appointment</h3>
      <form onSubmit={handleBookAppointment} style={{ marginTop: "1rem" }}>
        <div>
          <label>Title:</label>
          <input name="title" required style={inputStyle} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" required style={inputStyle} />
        </div>
        <div>
          <label>Appointment Date & Time:</label>
          <input type="datetime-local" name="datetime" required style={inputStyle} />
        </div>
        <button type="submit" style={buttonStyle}>
          Book Appointment
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  display: "block",
  marginBottom: "1rem",
  padding: "0.5rem",
  width: "100%",
  borderRadius: "4px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  backgroundColor: "#38ada9",
  color: "#fff",
  padding: "0.6rem 1.2rem",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

export default PatientPortal;
