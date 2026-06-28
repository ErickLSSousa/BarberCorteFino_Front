import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { authStorage } from "../../services/auth";
import "./AdminLayout.css";

export default function AdminLayout() {
  const navigate = useNavigate();

  function logout() {
    authStorage.clearAdmin();
    navigate("/admin/login");
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <strong className="admin-brand">Corte Fino Admin</strong>
        <nav className="admin-nav">
          <NavLink to="/admin/agendamentos">Agendamentos</NavLink>
          <NavLink to="/admin/precos">Preços</NavLink>
          <NavLink to="/admin/barbeiros">Barbeiros</NavLink>
          <NavLink to="/admin/portfolio">Portfólio</NavLink>
        </nav>
        <button className="admin-logout" onClick={logout}>Sair</button>
      </aside>
      <main className="admin-main"><Outlet /></main>
    </div>
  );
}
