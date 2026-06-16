export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone) {
  const phoneRegex = /^(\d{10,11})$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
}

export function validateName(name) {
  return name.trim().length >= 3;
}

export function sanitizeInput(input) {
  return input.trim().replace(/[<>]/g, '');
}
