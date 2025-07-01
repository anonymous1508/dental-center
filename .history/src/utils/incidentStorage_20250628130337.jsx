const INCIDENT_KEY = "incidents";

export const getIncidents = () => {
  const stored = localStorage.getItem(INCIDENT_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getIncidentsByPatient = (patientId) => {
  return getIncidents().filter((i) => i.patientId === patientId);
};

export const addIncident = (incident) => {
  const all = getIncidents();
  all.push(incident);
  localStorage.setItem(INCIDENT_KEY, JSON.stringify(all));
};

export const updateIncident = (updated) => {
  const all = getIncidents().map((i) =>
    i.id === updated.id ? updated : i
  );
  localStorage.setItem(INCIDENT_KEY, JSON.stringify(all));
};

export const deleteIncident = (id) => {
  const all = getIncidents().filter((i) => i.id !== id);
  localStorage.setItem(INCIDENT_KEY, JSON.stringify(all));
};
