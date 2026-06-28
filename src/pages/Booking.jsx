import { useEffect, useState } from "react";
import BackHomeButton from "../components/BackHomeButton";
import {
  servicesAPI,
  barbersAPI,
  availabilityAPI,
  appointmentsAPI,
} from "../services/api";
import "../components/BookingForm/BookingForm.css";

export default function Booking() {
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);

  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [client, setClient] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    async function loadData() {
      const servicesRes = await servicesAPI.getAll();
      const barbersRes = await barbersAPI.getAll();

      setServices(servicesRes.data.services || []);
      setBarbers(barbersRes.data.barbers || []);
    }

    loadData();
  }, []);

  useEffect(() => {
    async function loadAvailability() {
      if (!selectedBarber || !selectedDate || selectedServices.length === 0) {
        return;
      }

      try {
        const res = await availabilityAPI.getAvailable(
          selectedBarber,
          selectedDate,
          selectedServices,
        );

        setAvailableTimes(res.data.available_slots || []);
      } catch (err) {
        console.error(err);
      }
    }

    loadAvailability();
  }, [selectedBarber, selectedDate, selectedServices]);

  const toggleService = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId],
    );
  };

  const selectedServicesData = services.filter((s) =>
    selectedServices.includes(s.id),
  );

  const totalDuration = selectedServicesData.reduce(
    (acc, service) => acc + (service.duration_minutes || 0),
    0,
  );

  const totalPrice = selectedServicesData.reduce(
    (acc, service) => acc + (service.price_cents || 0),
    0,
  );

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await appointmentsAPI.create({
        barber_id: selectedBarber,
        service_ids: selectedServices,
        date: selectedDate,
        time: selectedTime,
        client,
      });

      alert("Agendamento realizado com sucesso!");

      window.location.reload();
    } catch (err) {
      alert(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Erro ao criar agendamento",
      );
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="booking-page container">
      <div className="booking-panel">
        <BackHomeButton className="booking-home-button" />
        <h1 className="booking-title">Agendar Horário</h1>

        <div className="booking-grid">
          <section className="booking-section services-card">
            <h2 className="booking-subtitle">Serviços</h2>
            <p className="booking-helper">
              Selecione um ou mais serviços para calcular o tempo e o valor do
              atendimento.
            </p>

            <div className="service-list">
              {services.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => toggleService(service.id)}
                  className={`service-option ${
                    selectedServices.includes(service.id) ? "is-selected" : ""
                  }`}
                >
                  <div className="service-name">{service.name}</div>

                  <div className="service-meta">
                    {service.duration_minutes} min
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="booking-section schedule-card">
            <h2 className="booking-subtitle">Barbeiros</h2>
            <p className="booking-helper">
              Escolha o profissional, a data e depois selecione um horário
              disponível.
            </p>

            <div className="booking-field">
              <label htmlFor="barber-select">Barbeiro</label>
              <select
                id="barber-select"
                className="booking-control"
                value={selectedBarber}
                onChange={(e) => setSelectedBarber(e.target.value)}
              >
                <option value="">Escolha o barbeiro</option>

                {barbers.map((barber) => (
                  <option key={barber.id} value={barber.id}>
                    {barber.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="booking-field">
              <label htmlFor="booking-date">Data</label>
              <input
                id="booking-date"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                className="booking-control"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <h2 className="booking-subtitle">Datas/horários disponíveis</h2>
            <p className="booking-helper">
              Os horários aparecem após selecionar serviços, barbeiro e data.
            </p>

            {availableTimes.length > 0 ? (
              <div className="time-grid">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`time-option ${
                      selectedTime === time ? "is-selected" : ""
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            ) : (
              <div className="empty-times">
                Nenhum horário para exibir no momento.
              </div>
            )}
          </section>
        </div>

        <section className="booking-section client-data">
          <h2 className="booking-subtitle">Seus Dados</h2>
          <p className="booking-helper">
            Informe seus dados para que a barbearia confirme o agendamento.
          </p>

          <div className="client-fields">
            <div className="booking-field">
              <label htmlFor="client-name">Nome</label>
              <input
                id="client-name"
                placeholder="Nome"
                className="booking-control"
                value={client.name}
                onChange={(e) =>
                  setClient({
                    ...client,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div className="booking-field">
              <label htmlFor="client-phone">Telefone</label>
              <input
                id="client-phone"
                placeholder="Telefone"
                className="booking-control"
                value={client.phone}
                onChange={(e) =>
                  setClient({
                    ...client,
                    phone: e.target.value.replace(/\D/g, ""),
                  })
                }
              />
            </div>

            <div className="booking-field">
              <label htmlFor="client-email">Email</label>
              <input
                id="client-email"
                placeholder="Email"
                className="booking-control"
                value={client.email}
                onChange={(e) =>
                  setClient({
                    ...client,
                    email: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </section>

        <div className="booking-summary">
          <h3 className="booking-subtitle">Resumo do Agendamento</h3>

          <div className="summary-row">
            <span>Serviços:</span>
            <span>{selectedServices.length}</span>
          </div>

          <div className="summary-row">
            <span>Duração:</span>
            <span>{totalDuration} min</span>
          </div>

          <div className="summary-row summary-total">
            <span>Total:</span>
            <span>R$ {(totalPrice / 100).toFixed(2)}</span>
          </div>
        </div>

        <button
          disabled={loading}
          onClick={handleSubmit}
          className="booking-submit"
        >
          {loading ? "Agendando..." : "Confirmar Agendamento"}
        </button>
      </div>
    </div>
  );
}
