import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminAuthAPI } from "../services/adminAPI";
import { authStorage } from "../services/auth";
import BackHomeButton from "../components/BackHomeButton";
import "./Login.css";

function normalizeCredentials(credentials) {
  return {
    email: credentials.email.trim().toLowerCase(),
    password: credentials.password.trim(),
  };
}

function getAdminLoginErrorMessage(err) {
  if (err?.code === "ERR_NETWORK") {
    return "Não foi possível conectar ao servidor. Verifique se a API está rodando e se VITE_API_URL aponta para o backend correto.";
  }

  if (err?.response?.status === 404) {
    return "Rota de login administrativo não encontrada no backend (/api/admin/login). Verifique a URL da API.";
  }

  return err?.response?.data?.message || "Acesso administrativo negado.";
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  function enterAdmin(session) {
    authStorage.setAdmin(session);
    navigate("/admin/agendamentos");
  }

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await adminAuthAPI.login(normalizeCredentials(form));
      enterAdmin(data.admin ? { ...data.admin, token: data.token } : data);
    } catch (err) {
      setError(getAdminLoginErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Login Admin</h1>
        <p>
          Área restrita para gerenciar agenda, barbeiros, preços e portfólio.
        </p>
        <form className="auth-form" onSubmit={submit}>
          {error && <div className="auth-error">{error}</div>}
          <input
            type="email"
            placeholder="E-mail do administrador"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button disabled={loading}>
            {loading ? "Entrando..." : "Entrar como admin"}
          </button>
        </form>
        <div className="auth-links">
          <BackHomeButton />
        </div>
      </section>
    </main>
  );
}
