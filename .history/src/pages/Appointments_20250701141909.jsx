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
    <div style={{ padding: "2rem" }}>
      {/* Nav Bar */}
      <div style={{ marginBottom: "2rem" }}>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>{" "}
        <button onClick={() => navigate("/patients")}>Patients</button>{" "}
        <button onClick={() => navigate("/calendar")}>Calendar</button>{" "}
        <button onClick={() => {
          localStorage.removeItem("authUser");
          navigate("/login");
        }}>Logout</button>
      </div>

      <h2>{editingId ? "Edit Appointment" : "Add Appointment"}</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
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
        <br />

        <input
          name="title"
          placeholder="Title"
          required
          value={form.title}
          onChange={handleChange}
        />
        <br />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <br />

        <input
          name="comments"
          placeholder="Comments"
          value={form.comments}
          onChange={handleChange}
        />
        <br />

        <input
          name="appointmentDate"
          type="datetime-local"
          required
          value={form.appointmentDate}
          onChange={handleChange}
        />
        <br />

        <input
          name="cost"
          type="number"
          placeholder="Cost"
          value={form.cost}
          onChange={handleChange}
        />
        <br />

        <input
          name="treatment"
          placeholder="Treatment Info"
          value={form.treatment}
          onChange={handleChange}
        />
        <br />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <br />

        <input
          name="nextDate"
          type="date"
          value={form.nextDate}
          onChange={handleChange}
        />
        <br />

        <input
          type="file"
          accept="image/*,application/pdf"
          multiple
          onChange={handleFileChange}
        />
        <br />

        <button type="submit">{editingId ? "Update" : "Add"} Appointment</button>
        {editingId && <button onClick={handleCancelEdit}>Cancel</button>}
      </form>

      {/* List */}
      <h3>All Appointments</h3>
      {incidents.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <ul>
          {incidents.map((i) => (
            <li key={i.id} style={{ marginBottom: "1rem" }}>
              <strong>{i.title}</strong> - {i.description}<br />
              For: {patients.find((p) => p.id === i.patientId)?.name || "Unknown"}<br />
              Date: {new Date(i.appointmentDate).toLocaleString()}<br />
              Status: {i.status} | ₹{i.cost} | Treatment: {i.treatment}<br />
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
  );
};

export default Appointments;

