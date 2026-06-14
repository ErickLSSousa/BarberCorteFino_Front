import { useEffect, useState } from "react";
import { servicesAPI, barbersAPI } from "../services/api";

export default function Booking() {
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);

  const [selectedService, setSelectedService] = useState("");
  const [selectedBarber, setSelectedBarber] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const times = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
  ];

  useEffect(() => {
    async function loadData() {
      try {
        const servicesRes = await servicesAPI.getAll();
        setServices(servicesRes.data.services || []);

        const barbersRes = await barbersAPI.getAll();
        setBarbers(barbersRes.data.barbers || []);
      } catch (error) {
        console.error(error);
      }
    }

    loadData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="card max-w-3xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Agendar Horário
        </h1>

        {/* Serviço */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Serviço
          </label>

          <select
            className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-700"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="">
              Escolha um serviço
            </option>

            {services.map((service) => (
              <option
                key={service.id}
                value={service.id}
              >
                {service.name}
              </option>
            ))}
          </select>
        </div>

        {/* Barbeiro */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Barbeiro
          </label>

          <select
            className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-700"
            value={selectedBarber}
            onChange={(e) => setSelectedBarber(e.target.value)}
          >
            <option value="">
              Escolha um barbeiro
            </option>

            {barbers.map((barber) => (
              <option
                key={barber.id}
                value={barber.id}
              >
                {barber.name}
              </option>
            ))}
          </select>
        </div>

        {/* Data */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Data
          </label>

          <input
            type="date"
            className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-700"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {/* Horários */}
        <div className="mb-8">
          <label className="block mb-3 font-medium">
            Horário
          </label>

          <div className="grid grid-cols-3 gap-3">
            {times.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`p-3 rounded-lg border transition ${
                  selectedTime === time
                    ? "bg-yellow-500 text-black border-yellow-500"
                    : "bg-zinc-900 border-zinc-700"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <button className="btn-accent w-full">
          Confirmar Agendamento
        </button>
      </div>
    </div>
  );
}