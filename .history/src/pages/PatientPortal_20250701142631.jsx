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
    const myAppointments = allIncidents.filter((i) => i.patientId === user.patientId);

    setPatient(currentPatient);
    setAppointments(myAppointments);
  }, [user]);

  return (
    <div style={{ padding: "2rem" }}>
      <Topbar />
      <h2>ENTNT Dashboard | My Portal</h2>

      <h3>My Dental Portal</h3>
      {!patient ? (
        <p style={{ color: "red" }}>Profile not found.</p>
      ) : (
        <div style={{ marginBottom: "2rem" }}>
          <p><strong>Name:</strong> {patient.name}</p>
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
    </div>
  );
};

export default PatientPortal;
