import axios from "axios";
import { getToken } from "../utils/auth";
import { getBaseURL, getCommonHeaders, logAPIError } from "./api";

const instance = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000, // Incrementar timeout para MongoDB Atlas
  headers: getCommonHeaders()
});

// Interceptor para requests
instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {  
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Log de la petición para debugging
  console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
  
  return config;
}, (error) => {
  console.error('❌ Request interceptor error:', error);
  return Promise.reject(error);
});

// Interceptor para responses
instance.interceptors.response.use(
  (response) => {
    // Log exitoso
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    // Log de error con detalles
    logAPIError(error, error.config?.url || 'unknown endpoint');
    
    // Personalizar mensajes de error según el tipo
    if (error.code === 'ECONNABORTED') {
      error.customMessage = 'Timeout: El servidor tardó demasiado en responder';
    } else if (error.response?.status === 404) {
      error.customMessage = 'Endpoint no encontrado en el servidor';
    } else if (error.response?.status === 500) {
      error.customMessage = 'Error interno del servidor MongoDB Atlas';
    } else if (!error.response) {
      error.customMessage = 'No se pudo conectar con MongoDB Atlas';
    }
    
    return Promise.reject(error);
  }
);

export default instance;
