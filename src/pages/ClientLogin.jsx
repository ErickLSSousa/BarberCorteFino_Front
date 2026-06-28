import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clientAuthAPI } from "../services/adminAPI";
import { authStorage } from "../services/auth";
import BackHomeButton from "../components/BackHomeButton";
import "./Login.css";

export default function ClientLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault(); setLoading(true); setError("");
    try {
      const { data } = await clientAuthAPI.login(form);
      authStorage.setClient(data.client ? { ...data.client, token: data.token } : data);
      navigate("/meus-agendamentos");
    } catch (err) { setError(err?.response?.data?.message || "Não foi possível entrar. Confira seus dados."); }
    finally { setLoading(false); }
  }

  return <main className="auth-page"><section className="auth-card"><h1>Login do Cliente</h1><p>Acesse seus agendamentos e acompanhe seus horários.</p><form className="auth-form" onSubmit={submit}>{error && <div className="auth-error">{error}</div>}<input type="email" placeholder="E-mail" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required/><input type="password" placeholder="Senha" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} required/><button disabled={loading}>{loading ? "Entrando..." : "Entrar"}</button></form><div className="auth-links"><BackHomeButton /><Link to="/agendar">Agendar sem login</Link></div></section></main>;
}
