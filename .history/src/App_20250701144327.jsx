import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Calendar from './pages/Calendar';
import PatientPortal from './pages/PatientPortal';

import RequireRole from './components/RequireRole'; // ✅ Make sure this file exists

const App = () => {
  return (
    <Router>
      <div style={{ fontFamily: 'Segoe UI, Arial, sans-serif', background: '#f5f6fa', minHeight: '100vh' }}>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Login />} />

          {/* Admin-only routes */}
          <Route
            path="/dashboard"
            element={
              <RequireRole allowedRoles={['Admin']}>
                <Dashboard />
              </RequireRole>
            }
          />
          <Route
            path="/patients"
            element={
              <RequireRole allowedRoles={['Admin']}>
                <Patients />
              </RequireRole>
            }
          />
          <Route
            path="/appointments"
            element={
              <RequireRole allowedRoles={['Admin']}>
                <Appointments />
              </RequireRole>
            }
          />
          <Route
            path="/calendar"
            element={
              <RequireRole allowedRoles={['Admin']}>
                <Calendar />
              </RequireRole>
            }
          />

          {/* Patient-only route */}
          <Route
            path="/patient-portal"
            element={
              <RequireRole allowedRoles={['Patient']}>
                <PatientPortal />
              </RequireRole>
            }
          />

          {/* Fallback redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
