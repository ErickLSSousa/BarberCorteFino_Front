import { useState, useEffect } from 'react';
import { appointmentsAPI } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { formatFullDate } from '../utils/formatters';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const res = await appointmentsAPI.getMy();
        setAppointments(res.data);
      } catch (err) {
        setError('Não foi possível carregar seus agendamentos.');
      } finally {
        setLoading(false);
      }
    };
    loadAppointments();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Meus Agendamentos</h1>

      {error && <ErrorMessage message={error} />}

      {appointments.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p>Você ainda não possui agendamentos.</p>
          <a href="/agendar" className="text-accent hover:underline mt-4 inline-block">
            Agendar agora
          </a>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-4">
          {appointments.map((apt) => (
            <div key={apt.id} className="card p-4 border-l-4 border-accent">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{apt.service.name}</h3>
                  <p className="text-gray-400">Com {apt.barber.name}</p>
                  <p className="mt-2">{formatFullDate(apt.date)} às {apt.time}</p>
                </div>
                <span className="bg-accent/20 text-accent px-3 py-1 rounded text-sm font-medium">
                  Confirmado
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
