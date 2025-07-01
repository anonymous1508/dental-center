const INCIDENT_KEY = "incidents";

// Get all incidents
export const getIncidents = () => {
  const stored = localStorage.getItem(INCIDENT_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Add an incident
export const addIncident = (incident) => {
  const all = getIncidents();
  all.push(incident);
  localStorage.setItem(INCIDENT_KEY, JSON.stringify(all));
};

// Update an incident
export const updateIncident = (updatedIncident) => {
  const all = getIncidents().map((i) =>
    i.id === updatedIncident.id ? updatedIncident : i
  );
  localStorage.setItem(INCIDENT_KEY, JSON.stringify(all));
};

// Delete an incident
export const deleteIncident = (id) => {
  const all = getIncidents().filter((i) => i.id !== id);
  localStorage.setItem(INCIDENT_KEY, JSON.stringify(all));
};
