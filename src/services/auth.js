const CLIENT_KEY = "corte_fino_client_session";
const ADMIN_KEY = "corte_fino_admin_session";

function read(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}
function write(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
function clear(key) { localStorage.removeItem(key); }

export const authStorage = {
  getClient: () => read(CLIENT_KEY),
  setClient: (data) => write(CLIENT_KEY, data),
  clearClient: () => clear(CLIENT_KEY),
  getAdmin: () => read(ADMIN_KEY),
  setAdmin: (data) => write(ADMIN_KEY, data),
  clearAdmin: () => clear(ADMIN_KEY),
};

export function authHeaders(session) {
  const token = session?.token || session?.accessToken;
  return token ? { Authorization: `Bearer ${token}` } : {};
}
