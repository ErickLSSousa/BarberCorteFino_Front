import { useEffect, useState } from "react";
import {
  servicesAPI,
  barbersAPI,
  availabilityAPI,
  appointmentsAPI,
} from "../services/api";

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
    <div className="container mx-auto px-4 py-12">
      {" "}
      <div className="max-w-4xl mx-auto bg-zinc-900 rounded-3xl p-8 shadow-xl">
        <h1 className="text-4xl font-bold text-center mb-8">Agendar Horário</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-semibold mb-3">Serviços</h2>

            <div className="space-y-3">
              {services.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => toggleService(service.id)}
                  className={`w-full p-4 rounded-xl border text-left transition ${
                    selectedServices.includes(service.id)
                      ? "bg-yellow-500 text-black border-yellow-500"
                      : "bg-zinc-800 border-zinc-700"
                  }`}
                >
                  <div className="font-medium">{service.name}</div>

                  <div className="text-sm opacity-80">
                    {service.duration_minutes} min
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <select
              className="w-full mb-4 p-3 rounded-lg bg-zinc-800"
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

            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="w-full mb-4 p-3 rounded-lg bg-zinc-800"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />

            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`p-2 rounded-lg ${
                    selectedTime === time
                      ? "bg-yellow-500 text-black"
                      : "bg-zinc-800"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-700 pt-6">
          <h2 className="font-semibold mb-4">Seus Dados</h2>

          <input
            placeholder="Nome"
            className="w-full mb-3 p-3 rounded-lg bg-zinc-800"
            value={client.name}
            onChange={(e) =>
              setClient({
                ...client,
                name: e.target.value,
              })
            }
          />

          <input
            placeholder="Telefone"
            className="w-full mb-3 p-3 rounded-lg bg-zinc-800"
            value={client.phone}
            onChange={(e) =>
              setClient({
                ...client,
                phone: e.target.value.replace(/\D/g, ""),
              })
            }
          />

          <input
            placeholder="Email"
            className="w-full mb-3 p-3 rounded-lg bg-zinc-800"
            value={client.email}
            onChange={(e) =>
              setClient({
                ...client,
                email: e.target.value,
              })
            }
          />
        </div>

        <div className="mt-6 bg-zinc-800 rounded-xl p-5 border border-zinc-700">
          <h3 className="font-semibold mb-3">Resumo do Agendamento</h3>

          <div className="flex justify-between mb-2">
            <span>Serviços:</span>
            <span>{selectedServices.length}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Duração:</span>
            <span>{totalDuration} min</span>
          </div>

          <div className="flex justify-between font-bold text-yellow-400">
            <span>Total:</span>
            <span>R$ {(totalPrice / 100).toFixed(2)}</span>
          </div>
        </div>

        <button
          disabled={loading}
          onClick={handleSubmit}
          className="w-full mt-6 bg-yellow-500 text-black font-bold py-4 rounded-xl hover:scale-[1.02] transition"
        >
          {loading ? "Agendando..." : "Confirmar Agendamento"}
        </button>
      </div>
    </div>
  );
}
