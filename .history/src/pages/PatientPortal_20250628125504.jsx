import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import { useAuth } from "../contexts/AuthContext";
import { getPatients } from "../utils/patientStorage";
import { getIncidentsByPatient } from "../utils/incidentStorage";

const PatientPortal = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (user?.role !== "Patient") return;

    // Find patient data
    const allPatients = getPatients();
    const myProfile = allPatients.find((p) => p.id === user.patientId);
    setProfile(myProfile);

    // Get incidents for this patient
    const myAppointments = getIncidentsByPatient(user.patientId);
    setAppointments(myAppointments);
  }, [user]);

  if (!user || user.role !== "Patient") {
    return <p>Unauthorized access</p>;
  }

  return (
    <div className="container">
      <Topbar />
      <h2>My Dental Portal</h2>

      {profile ? (
        <div className="card">
          <h3>Profile</h3>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>DOB:</strong> {profile.dob}</p>
          <p><strong>Contact:</strong> {profile.contact}</p>
          <p><strong>Health Info:</strong> {profile.healthInfo}</p>
        </div>
      ) : (
        <p>Profile not found.</p>
      )}

      <div className="card" style={{ marginTop: "1rem" }}>
        <h3>Appointment History</h3>
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <ul>
            {appointments.map((a) => (
              <li key={a.id} style={{ marginBottom: "1rem" }}>
                <strong>{a.title}</strong> — {a.appointmentDate?.slice(0, 16).replace("T", " ")}<br />
                <strong>Comments:</strong> {a.comments}<br />
                <strong>Treatment:</strong> {a.treatment}<br />
                <strong>Cost:</strong> ₹{a.cost}<br />
                <strong>Status:</strong> {a.status}<br />
                <strong>Next Visit:</strong> {a.nextDate}<br />
                {a.files?.length > 0 && (
                  <div>
                    <strong>Files:</strong>{" "}
                    {a.files.map((f, i) => (
                      <a key={i} href={f.url} target="_blank" rel="noreferrer">
                        {f.name}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PatientPortal;
