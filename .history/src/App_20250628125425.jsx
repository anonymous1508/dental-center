import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Calendar from "./pages/Calendar";
import PatientPortal from "./pages/PatientPortal";

import RequireRole from "./components/RequireRole";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Admin-only Routes */}
        <Route
          path="/dashboard"
          element={
            <RequireRole role="Admin">
              <Dashboard />
            </RequireRole>
          }
        />
        <Route
          path="/patients"
          element={
            <RequireRole role="Admin">
              <Patients />
            </RequireRole>
          }
        />
        <Route
          path="/appointments"
          element={
            <RequireRole role="Admin">
              <Appointments />
            </RequireRole>
          }
        />
        <Route
          path="/calendar"
          element={
            <RequireRole role="Admin">
              <Calendar />
            </RequireRole>
          }
        />

        {/* Patient-only Route */}
        <Route
          path="/patient-portal"
          element={
            <RequireRole role="Patient">
              <PatientPortal />
            </RequireRole>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
