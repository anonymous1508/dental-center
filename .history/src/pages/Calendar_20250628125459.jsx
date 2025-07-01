import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import { getIncidents } from "../utils/incidentStorage";

const Calendar = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setAppointments(getIncidents());
  }, []);

  const getDatesInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const dates = [];
    while (date.getMonth() === month) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const today = new Date();
  const dates = getDatesInMonth(today.getFullYear(), today.getMonth());

  const appointmentsOnDate = (dateStr) =>
    appointments.filter((a) =>
      a.appointmentDate?.startsWith(dateStr)
    );

  const formatDate = (date) =>
    date.toISOString().split("T")[0]; // yyyy-mm-dd

  return (
    <div className="container">
      <Topbar />
      <h2>Calendar View</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "10px",
          marginTop: "1rem",
        }}
      >
        {dates.map((d) => {
          const dateStr = formatDate(d);
          const appts = appointmentsOnDate(dateStr);
          return (
            <div
              key={dateStr}
              className="card"
              style={{ minHeight: "100px", cursor: "pointer" }}
              onClick={() => setSelectedDate(dateStr)}
            >
              <strong>{d.getDate()}</strong>
              <ul style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                {appts.slice(0, 2).map((a) => (
                  <li key={a.id}>{a.title}</li>
                ))}
                {appts.length > 2 && <li>+{appts.length - 2} more</li>}
              </ul>
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="card" style={{ marginTop: "1.5rem" }}>
          <h3>Appointments on {selectedDate}</h3>
          <ul>
            {appointmentsOnDate(selectedDate).map((a) => (
              <li key={a.id}>
                <strong>{a.title}</strong> — {a.patientId}, {a.appointmentDate.slice(11, 16)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Calendar;
