import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import PatientForm from "../components/PatientForm";
import {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient
} from "../utils/patientStorage";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setPatients(getPatients());
  }, []);

  const handleAdd = () => {
    setSelectedPatient(null);
    setShowForm(true);
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    deletePatient(id);
    setPatients(getPatients());
  };

  const handleSave = (patient) => {
    if (selectedPatient) {
      updatePatient(patient);
    } else {
      addPatient(patient);
    }
    setShowForm(false);
    setPatients(getPatients());
  };

  return (
    <div className="container">
      <Topbar />
      <h2>Patient Management</h2>
      <button className="btn" onClick={handleAdd}>
        + Add Patient
      </button>

      <table style={{ width: "100%", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Contact</th>
            <th>Health Info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td colSpan="5">No patients found.</td>
            </tr>
          ) : (
            patients.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.dob}</td>
                <td>{p.contact}</td>
                <td>{p.healthInfo}</td>
                <td>
                  <button className="btn" onClick={() => handleEdit(p)}>Edit</button>
                  <button
                    className="btn"
                    onClick={() => handleDelete(p.id)}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showForm && (
        <PatientForm
          selectedPatient={selectedPatient}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Patients;
