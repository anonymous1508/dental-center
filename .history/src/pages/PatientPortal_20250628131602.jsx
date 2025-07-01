import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const PatientPortal = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const incidents = JSON.parse(localStorage.getItem('incidents')) || [];

    if (user && user.patientId) {
      const myProfile = patients.find((p) => p.id === user.patientId);
      const myAppointments = incidents.filter((i) => i.patientId === user.patientId);

      setProfile(myProfile);
      setAppointments(myAppointments);
    }
  }, [user]);

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>ENTNT Dashboard | My Portal</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <h3>My Dental Portal</h3>

      {profile ? (
        <div style={{ marginBottom: '1rem' }}>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>DOB:</strong> {profile.dob}</p>
          <p><strong>Contact:</strong> {profile.contact}</p>
          <p><strong>Health Info:</strong> {profile.healthInfo}</p>
        </div>
      ) : (
        <p>Profile not found.</p>
      )}

      <h3>Appointment History</h3>
      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appt) => (
            <li key={appt.id} style={{ marginBottom: '1rem' }}>
              <p><strong>Title:</strong> {appt.title}</p>
              <p><strong>Description:</strong> {appt.description}</p>
              <p><strong>Date:</strong> {new Date(appt.appointmentDate).toLocaleString()}</p>
              <p><strong>Status:</strong> {appt.status}</p>
              <p><strong>Cost:</strong> ₹{appt.cost}</p>
              {appt.files && appt.files.length > 0 && (
                <div>
                  <strong>Files:</strong>
                  <ul>
                    {appt.files.map((file, index) => (
                      <li key={index}>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                          {file.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default PatientPortal;
