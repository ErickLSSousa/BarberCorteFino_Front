import api from "./api";
import { authHeaders, authStorage } from "./auth";

const withAdminAuth = () => ({ headers: authHeaders(authStorage.getAdmin()) });

export const adminAuthAPI = {
  login: (credentials) => api.post("/admin/login", credentials),
};

export const clientAuthAPI = {
  login: (credentials) => api.post("/clients/login", credentials),
  register: (data) => api.post("/clients", data),
};

export const adminAppointmentsAPI = {
  getAll: () => api.get("/appointments", withAdminAuth()),
  updateStatus: (id, status) => api.patch(`/appointments/${id}`, { status }, withAdminAuth()),
  remove: (id) => api.delete(`/appointments/${id}`, withAdminAuth()),
};

export const adminServicesAPI = {
  create: (data) => api.post("/services", data, withAdminAuth()),
  update: (id, data) => api.put(`/services/${id}`, data, withAdminAuth()),
  remove: (id) => api.delete(`/services/${id}`, withAdminAuth()),
};

export const adminBarbersAPI = {
  create: (data) => api.post("/barbers", data, withAdminAuth()),
  update: (id, data) => api.put(`/barbers/${id}`, data, withAdminAuth()),
  remove: (id) => api.delete(`/barbers/${id}`, withAdminAuth()),
};

export const adminPortfolioAPI = {
  create: (data) => api.post("/portfolio", data, withAdminAuth()),
  update: (id, data) => api.put(`/portfolio/${id}`, data, withAdminAuth()),
  remove: (id) => api.delete(`/portfolio/${id}`, withAdminAuth()),
};
