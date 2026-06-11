export function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatTime(time) {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(time));
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}
