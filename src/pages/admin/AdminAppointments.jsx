import { useEffect, useState } from "react";
import { adminAppointmentsAPI } from "../../services/adminAPI";

export default function AdminAppointments() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  async function load() {
    try {
      const { data } = await adminAppointmentsAPI.getAll();
      setItems(data.appointments || data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);
  async function status(id, value) {
    await adminAppointmentsAPI.updateStatus(id, value);
    load();
  }
  return (
    <section className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Agendamentos</h1>
          <p className="muted">Controle os horários marcados pelos clientes.</p>
        </div>
      </div>
      <div className="admin-card admin-table-wrap">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Barbeiro</th>
                <th>Data</th>
                <th>Hora</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((a) => (
                <tr key={a.id}>
                  <td>{a.client_name || a.client?.name || "Cliente"}</td>
                  <td>{a.barber_name || a.barber?.name || "-"}</td>
                  <td>{a.date}</td>
                  <td>{a.time || a.start_time}</td>
                  <td>{a.status || "pendente"}</td>
                  <td>
                    <div className="admin-actions">
                      <button onClick={() => status(a.id, "confirmed")}>
                        Confirmar
                      </button>
                      <button
                        onClick={() => status(a.id, "cancelled")}
                        className="danger-btn"
                      >
                        Cancelar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
