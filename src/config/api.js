// Configuración de endpoints para MongoDB Atlas
export const API_ENDPOINTS = {
  // Piscinas
  PISCINAS: {
    GET_ALL: '/piscinas',
    GET_BY_ID: (id) => `/piscinas/${id}`,
    CREATE: '/piscinas',
    UPDATE: (id) => `/piscinas/${id}`,
    DELETE: (id) => `/piscinas/${id}`
  },
  
  // Usuarios (para futuras implementaciones)
  USERS: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile'
  }
};

// URLs de MongoDB Atlas comunes
export const MONGODB_ATLAS_URLS = {
  DEVELOPMENT: 'http://localhost:3003/api',
  PRODUCTION: 'https://tu-backend-mongodb.herokuapp.com/api',
  STAGING: 'https://tu-backend-mongodb-staging.herokuapp.com/api'
};

// Función para obtener la URL base según el ambiente
export const getBaseURL = () => {
  // Prioridad: variable de entorno -> ambiente detectado -> desarrollo local
  if (import.meta.env.VITE_APP_BASE_API) {
    return import.meta.env.VITE_APP_BASE_API;
  }
  
  if (import.meta.env.PROD) {
    return MONGODB_ATLAS_URLS.PRODUCTION;
  }
  
  return MONGODB_ATLAS_URLS.DEVELOPMENT;
};

// Headers comunes para las peticiones
export const getCommonHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});

// Función para logging de errores de API
export const logAPIError = (error, endpoint) => {
  console.group(`❌ Error en API - ${endpoint}`);
  console.error('Error completo:', error);
  
  if (error.response) {
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
    console.error('Headers:', error.response.headers);
  } else if (error.request) {
    console.error('Request:', error.request);
    console.error('No response received from server');
  } else {
    console.error('Error message:', error.message);
  }
  
  console.groupEnd();
};

// Función para logging exitoso de API
export const logAPISuccess = (data, endpoint) => {
  console.group(`✅ Éxito en API - ${endpoint}`);
  console.log('Data received:', data);
  console.groupEnd();
};