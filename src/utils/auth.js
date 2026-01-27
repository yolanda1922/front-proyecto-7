// Funciones para manejar autenticación
export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;
  
  // Aquí puedes agregar lógica para verificar si el token no ha expirado
  // Por ahora solo verificamos que exista
  return true;
};