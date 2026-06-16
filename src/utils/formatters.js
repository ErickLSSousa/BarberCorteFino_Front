import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Formatar preço para moeda brasileira
export const formatPrice = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

// Formatar data para exibição
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  return format(date, 'dd/MM/yyyy', { locale: ptBR });
};

// Formatar data completa
export const formatFullDate = (dateString) => {
  if (!dateString) return '';
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
};

// Formatar duração em minutos
export const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins > 0 ? `${mins}min` : ''}`;
};
