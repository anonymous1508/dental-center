import React, { useState, useEffect } from "react";

const AppointmentForm = ({ onSave, selected, patientId, onCancel }) => {
  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    comments: "",
    appointmentDate: "",
    cost: "",
    treatment: "",
    status: "",
    nextDate: "",
    files: [],
  });

  useEffect(() => {
    if (selected) {
      setForm(selected);
    } else {
      setForm({
        id: Date.now().toString(),
        title: "",
        description: "",
        comments: "",
        appointmentDate: "",
        cost: "",
        treatment: "",
        status: "",
        nextDate: "",
        files: [],
        patientId,
      });
    }
  }, [selected, patientId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileData = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setForm({ ...form, files: fileData });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ marginTop: "1rem" }}>
      <h3>{selected ? "Edit Appointment" : "Add Appointment"}</h3>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />
      <input
        name="comments"
        placeholder="Comments"
        value={form.comments}
        onChange={handleChange}
      />
      <input
        type="datetime-local"
        name="appointmentDate"
        value={form.appointmentDate}
        onChange={handleChange}
        required
      />
      <input
        name="treatment"
        placeholder="Treatment Given"
        value={form.treatment}
        onChange={handleChange}
      />
      <input
        name="cost"
        type="number"
        placeholder="Cost"
        value={form.cost}
        onChange={handleChange}
      />
      <input
        name="status"
        placeholder="Status"
        value={form.status}
        onChange={handleChange}
      />
      <input
        name="nextDate"
        type="date"
        placeholder="Next Appointment"
        value={form.nextDate}
        onChange={handleChange}
      />
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ marginTop: "0.5rem" }}
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

export default AppointmentForm;
