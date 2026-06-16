import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Summary({ data }) {
  return (
    <div className="card max-w-md mx-auto p-6 space-y-4">
      <h3 className="text-xl font-bold text-center mb-4">Resumo do Agendamento</h3>
      
      <div className="space-y-2">
        <div>
          <p className="text-gray-400 text-sm">Serviço:</p>
          <p className="font-medium">{data.service?.name}</p>
          <p className="text-sm text-accent">R$ {data.service?.price.toFixed(2)}</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Profissional:</p>
          <p className="font-medium">{data.barber?.name}</p>
          <p className="text-sm text-gray-400">{data.barber?.specialty}</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Data e Horário:</p>
          <p className="font-medium">
            {data.date && format(data.date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </p>
          <p className="font-medium text-lg">{data.time}</p>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-4 mt-4">
        <p className="text-sm text-gray-300 text-center">
          Ao confirmar, você concorda com o atendimento no horário escolhido.
        </p>
      </div>
    </div>
  );
}
