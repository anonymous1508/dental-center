import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const [patients, setPatients] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    patientId: "",
    title: "",
    description: "",
    comments: "",
    appointmentDate: "",
    cost: "",
    treatment: "",
    status: "Pending",
    nextDate: "",
    files: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    const storedIncidents = JSON.parse(localStorage.getItem("incidents")) || [];
    setPatients(storedPatients);
    setIncidents(storedIncidents);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({ name: file.name, url: reader.result });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    ).then((fileData) => {
      setForm((prev) => ({ ...prev, files: fileData }));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let updated;
    if (editingId) {
      // Edit existing
      updated = incidents.map((i) =>
        i.id === editingId ? { ...i, ...form, id: editingId } : i
      );
    } else {
      // Add new
      const newIncident = { id: `i${Date.now()}`, ...form };
      updated = [...incidents, newIncident];
    }

    localStorage.setItem("incidents", JSON.stringify(updated));
    setIncidents(updated);
    setForm({
      patientId: "",
      title: "",
      description: "",
      comments: "",
      appointmentDate: "",
      cost: "",
      treatment: "",
      status: "Pending",
      nextDate: "",
      files: [],
    });
    setEditingId(null);
  };

  const handleEdit = (incident) => {
    setForm(incident);
    setEditingId(incident.id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({
      patientId: "",
      title: "",
      description: "",
      comments: "",
      appointmentDate: "",
      cost: "",
      treatment: "",
      status: "Pending",
      nextDate: "",
      files: [],
    });
  };

  return (
    <div className="appointments-container">
      {/* Nav Bar */}
      <div className="appointments-navbar">
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/patients")}>Patients</button>
        <button onClick={() => navigate("/calendar")}>Calendar</button>
        <button
          onClick={() => {
            localStorage.removeItem("authUser");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>

      <h2>{editingId ? "Edit Appointment" : "Add Appointment"}</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="appointments-form">
        <select
          name="patientId"
          required
          value={form.patientId}
          onChange={handleChange}
        >
          <option value="">-- Select Patient --</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <input
          name="title"
          placeholder="Title"
          required
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="comments"
          placeholder="Comments"
          value={form.comments}
          onChange={handleChange}
        />
        <input
          name="appointmentDate"
          type="datetime-local"
          required
          value={form.appointmentDate}
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
          name="treatment"
          placeholder="Treatment Info"
          value={form.treatment}
          onChange={handleChange}
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <input
          name="nextDate"
          type="date"
          value={form.nextDate}
          onChange={handleChange}
        />
        <input
          type="file"
          accept="image/*,application/pdf"
          multiple
          onChange={handleFileChange}
        />
        <button type="submit">{editingId ? "Update" : "Add"} Appointment</button>
        {editingId && <button onClick={handleCancelEdit}>Cancel</button>}
      </form>

      {/* List */}
      <h3>All Appointments</h3>
      <div className="appointments-list">
        {incidents.length === 0 ? (
          <p>No appointments yet.</p>
        ) : (
          <ul>
            {incidents.map((i) => (
              <li key={i.id}>
                <strong>{i.title}</strong> - {i.description}
                <br />
                For: {patients.find((p) => p.id === i.patientId)?.name || "Unknown"}
                <br />
                Date: {new Date(i.appointmentDate).toLocaleString()}
                <br />
                Status: {i.status} | ₹{i.cost} | Treatment: {i.treatment}
                <br />
                <button onClick={() => handleEdit(i)}>Edit</button>
                <br />
                Files:
                <ul>
                  {i.files?.map((f, idx) => (
                    <li key={idx}>
                      <a href={f.url} target="_blank" rel="noopener noreferrer">
                        {f.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Appointments;

const styles = `
.appointments-container {
  max-width: 800px;
  margin: 2rem auto;
  background: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  padding: 2rem;
  font-family: 'Segoe UI', Arial, sans-serif;
}
.appointments-navbar {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
.appointments-navbar button {
  background: #1976d2;
  color: #fff;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}
.appointments-navbar button:hover {
  background: #125ea2;
}
.appointments-form {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 6px rgba(0,0,0,0.04);
}
.appointments-form input,
.appointments-form select,
.appointments-form textarea {
  width: 100%;
  margin: 0.5rem 0 1rem 0;
  padding: 0.6rem;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  font-size: 1rem;
  background: #f3f4f6;
  transition: border 0.2s;
}
.appointments-form input:focus,
.appointments-form select:focus,
.appointments-form textarea:focus {
  border: 1.5px solid #1976d2;
  outline: none;
  background: #fff;
}
.appointments-form button {
  background: #43a047;
  color: #fff;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  margin-right: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.appointments-form button[type="submit"]:hover {
  background: #388e3c;
}
.appointments-form button:not([type="submit"]) {
  background: #e53935;
}
.appointments-form button:not([type="submit"]):hover {
  background: #b71c1c;
}
.appointments-list {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 6px rgba(0,0,0,0.04);
}
.appointments-list ul {
  list-style: none;
  padding: 0;
}
.appointments-list li {
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem 0;
}
.appointments-list li:last-child {
  border-bottom: none;
}
.appointments-list strong {
  color: #1976d2;
  font-size: 1.1rem;
}
.appointments-list a {
  color: #388e3c;
  text-decoration: underline;
  font-size: 0.97rem;
}
.appointments-list a:hover {
  color: #1976d2;
}
`;

if (typeof document !== "undefined" && !document.getElementById("appointments-styles")) {
  const styleTag = document.createElement("style");
  styleTag.id = "appointments-styles";
  styleTag.innerHTML = styles;
  document.head.appendChild(styleTag);
}