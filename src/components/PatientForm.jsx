import React, { useState, useEffect } from "react";

const PatientForm = ({ onSave, selectedPatient, onCancel }) => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    dob: "",
    contact: "",
    healthInfo: ""
  });

  useEffect(() => {
    if (selectedPatient) {
      setForm(selectedPatient);
    } else {
      setForm({
        id: Date.now().toString(),
        name: "",
        dob: "",
        contact: "",
        healthInfo: ""
      });
    }
  }, [selectedPatient]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ marginTop: "1rem" }}>
      <h3>{selectedPatient ? "Edit Patient" : "Add Patient"}</h3>
      <input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="dob"
        type="date"
        value={form.dob}
        onChange={handleChange}
        required
      />
      <input
        name="contact"
        placeholder="Contact Number"
        value={form.contact}
        onChange={handleChange}
        required
      />
      <input
        name="healthInfo"
        placeholder="Health Info"
        value={form.healthInfo}
        onChange={handleChange}
      />
      <div style={{ marginTop: "1rem" }}>
        <button type="submit" className="btn">Save</button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn" style={{ marginLeft: "1rem" }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default PatientForm;
