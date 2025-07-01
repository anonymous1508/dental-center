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
      <div style={{ marginBottom: "2rem" }}>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>DOB:</strong> 1990-01-01</p>
        <p><strong>Contact:</strong> 9876543210</p>
        <p><strong>Health Info:</strong> No allergies. Blood group O+.</p>
      </div>
      <style>
        {`
          .patient-portal-container {
        background: #f8fafc;
        border-radius: 12px;
        box-shadow: 0 2px 16px rgba(56, 173, 169, 0.08);
        padding: 2rem;
        max-width: 700px;
        margin: 2rem auto;
          }
          .patient-info {
        background: #fff;
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 2rem;
        box-shadow: 0 1px 6px rgba(56, 173, 169, 0.06);
          }
          .appointment-history {
        background: #fff;
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 2rem;
        box-shadow: 0 1px 6px rgba(56, 173, 169, 0.06);
          }
          .appointment-history ul {
        list-style: none;
        padding: 0;
          }
          .appointment-history li {
        background: #f0f9f8;
        border-radius: 6px;
        margin-bottom: 1.5rem;
        padding: 1rem;
        border-left: 4px solid #38ada9;
          }
          .appointment-history li:last-child {
        margin-bottom: 0;
          }
          .book-appointment-form {
        background: #fff;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 1px 6px rgba(56, 173, 169, 0.06);
          }
          .book-appointment-form label {
        font-weight: 500;
        margin-bottom: 0.3rem;
        display: block;
        color: #38ada9;
          }
          .book-appointment-form input,
          .book-appointment-form textarea {
        margin-bottom: 1rem;
        border: 1px solid #b2dfdb;
        border-radius: 4px;
        padding: 0.5rem;
        width: 100%;
        font-size: 1rem;
        background: #f8fafc;
        transition: border 0.2s;
          }
          .book-appointment-form input:focus,
          .book-appointment-form textarea:focus {
        border: 1.5px solid #38ada9;
        outline: none;
          }
          .book-appointment-form button {
        background: linear-gradient(90deg, #38ada9 60%, #78e08f 100%);
        color: #fff;
        padding: 0.7rem 1.5rem;
        border: none;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
          }
          .book-appointment-form button:hover {
        background: linear-gradient(90deg, #78e08f 60%, #38ada9 100%);
          }
        `}
      </style>
      <div className="patient-portal-container">
        <div className="patient-info">
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>DOB:</strong> 1990-01-01</p>
          <p><strong>Contact:</strong> 9876543210</p>
          <p><strong>Health Info:</strong> No allergies. Blood group O+.</p>
        </div>
      </div>
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
