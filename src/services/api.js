import axios from "axios";

function normalizeBaseURL(url) {
  return url.replace(/\/+$/, "");
}

const PRODUCTION_API_URL = "https://barbercortefino-back.onrender.com";

function getApiBaseURL() {
  const configuredApiURL = import.meta.env.VITE_API_URL?.trim();
  const apiURL = configuredApiURL ||
    (import.meta.env.DEV ? "http://localhost:3001" : PRODUCTION_API_URL);

  return `${normalizeBaseURL(apiURL)}/api`;
}

const api = axios.create({
  baseURL: getApiBaseURL(),
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

// Portfolio (se existir no backend)
export const portfolioAPI = {
  getAll: () => api.get("/portfolio"),   // ajuste se a rota for diferente
};

export default api;
