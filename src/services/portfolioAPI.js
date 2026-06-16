import api from "./api";

export const portfolioAPI = {
  getAll() {
    return api.get("/portfolio");
  },
};