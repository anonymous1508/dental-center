import React, { useEffect, useState } from "react";

const Calendar = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("incidents")) || [];
    const patientList = JSON.parse(localStorage.getItem("patients")) || [];
    setAppointments(stored);
    setPatients(patientList);
  }, []);

  const getAppointmentsByDate = (dateStr) => {
    return appointments.filter((a) =>
      a.appointmentDate?.startsWith(dateStr)
    );
  };

  const generateDaysInMonth = (year, month) => {
    const days = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const days = generateDaysInMonth(year, month);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Calendar View (Month)</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "10px",
        marginBottom: "2rem"
      }}>
        {days.map((d) => {
          const dateStr = d.toISOString().split("T")[0];
          const dailyAppointments = getAppointmentsByDate(dateStr);
          return (
            <div
              key={dateStr}
              style={{
                border: "1px solid #ccc",
                padding: "0.5rem",
                cursor: "pointer",
                background: selectedDate === dateStr ? "#def" : "#f9f9f9"
              }}
              onClick={() => setSelectedDate(dateStr)}
            >
              <strong>{d.getDate()}</strong>
              <div style={{ fontSize: "0.8rem", color: "#777" }}>
                {dailyAppointments.length} appointments
              </div>
            </div>
          );
        })}
      </div>

      <h3>
        Appointments on {selectedDate || "Select a day"}
      </h3>
      {selectedDate ? (
        getAppointmentsByDate(selectedDate).length === 0 ? (
          <p>No appointments.</p>
        ) : (
          <ul>
            {getAppointmentsByDate(selectedDate).map((a) => (
              <li key={a.id}>
                {a.title} - {new Date(a.appointmentDate).toLocaleTimeString()}<br />
                For: {patients.find(p => p.id === a.patientId)?.name || "Unknown"}<br />
                Status: {a.status} | ₹{a.cost}
              </li>
            ))}
          </ul>
        )
      ) : (
        <p>Click a date to see appointments.</p>
      )}
    </div>
  );
};

export default Calendar;
