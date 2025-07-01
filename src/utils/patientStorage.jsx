const PATIENT_KEY = "patients";

// Load all patients
export const getPatients = () => {
  const stored = localStorage.getItem(PATIENT_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Add new patient
export const addPatient = (patient) => {
  const patients = getPatients();
  patients.push(patient);
  localStorage.setItem(PATIENT_KEY, JSON.stringify(patients));
};

// Update patient
export const updatePatient = (updated) => {
  const patients = getPatients().map((p) =>
    p.id === updated.id ? updated : p
  );
  localStorage.setItem(PATIENT_KEY, JSON.stringify(patients));
};

// Delete patient
export const deletePatient = (id) => {
  const patients = getPatients().filter((p) => p.id !== id);
  localStorage.setItem(PATIENT_KEY, JSON.stringify(patients));
};
