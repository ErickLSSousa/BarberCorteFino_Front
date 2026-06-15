import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const servicesAPI = {
  getAll: () => api.get("/services"),
};

export const barbersAPI = {
  getAll: () => api.get("/barbers"),
};

export const availabilityAPI = {
  getAvailable: (barberId, date, serviceIds) =>
    api.get("/availability", {
      params: {
        barber_id: barberId,
        date,
        service_ids: serviceIds.join(","),
      },
    }),
};

export const appointmentsAPI = {
  create: (data) => api.post("/appointments", data),
};

export default api;