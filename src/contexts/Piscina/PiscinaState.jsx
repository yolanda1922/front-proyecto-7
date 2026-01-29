import { useReducer, useEffect } from "react";
import PiscinaContext from "./PiscinaContex";
import PiscinaReducer from "./Piscinareducer";
import axiosClient from "../../config/axios";
import { API_ENDPOINTS, logAPISuccess, logAPIError } from "../../config/api";

const PiscinaState = (props) => {
  const initialState = {
    piscinas: [],
    piscinaSeleccionada: null,
    loading: false,
    error: null
  };

  const [globalState, dispatch] = useReducer(PiscinaReducer, initialState);

  // Cargar piscinas al inicializar el componente
  useEffect(() => {
    getPiscinas();
  }, []);

  // Obtener todas las piscinas del backend
  const getPiscinas = async () => {
    dispatch({ type: 'GET_PISCINAS' });
    try {
      console.log(`🔄 Conectando con backend en: ${import.meta.env.VITE_APP_BASE_API}`);
      const response = await axiosClient.get(API_ENDPOINTS.PISCINAS.GET_ALL);
      
      // Verificar si la respuesta tiene el formato esperado
      let data;
      if (response.data && response.data.piscinas) {
        data = response.data.piscinas;
      } else if (response.data && response.data.data) {
        data = response.data.data;
      } else if (Array.isArray(response.data)) {
        data = response.data;
      } else {
        console.warn("⚠️  Formato de respuesta inesperado:", response.data);
        data = [];
      }
      
      logAPISuccess(data, 'GET /piscinas');
      console.log(`✅ ${data.length} piscinas obtenidas desde MongoDB Atlas`);
      dispatch({ type: 'SET_PISCINAS', payload: data });
    } catch (error) {
      logAPIError(error, 'GET /piscinas');
      
      let errorMessage = `❌ Error al conectar con el backend (${import.meta.env.VITE_APP_BASE_API})`;
      
      if (error.customMessage) {
        errorMessage = error.customMessage;
      } else if (error.response?.status === 0) {
        errorMessage = `No se puede conectar con el servidor: ${import.meta.env.VITE_APP_BASE_API}`;
      } else if (error.response?.status >= 500) {
        errorMessage = 'Error en el servidor del backend';
      }
      
      console.log(`🔄 Usando datos de ejemplo. Verifica que el backend esté corriendo en: ${import.meta.env.VITE_APP_BASE_API}`);
      
      // Datos de ejemplo para demostración (mientras configuras MongoDB Atlas)
      const piscinasEjemplo = [
        {
          _id: "ejemplo-1",
          nombre: "Piscina Olímpica Municipal",
          descripcion: "Piscina de 50 metros con 8 carriles profesionales, ideal para competencias",
          ubicacion: "Centro Deportivo Municipal, Av. Independencia 1250",
          precio: 75
        },
        {
          _id: "ejemplo-2", 
          nombre: "Aqua Family Resort",
          descripcion: "Piscina familiar con área infantil, toboganes y zona de relax",
          ubicacion: "Club Familiar Los Pinos, Zona Norte",
          precio: 45
        },
        {
          _id: "ejemplo-3",
          nombre: "Infinity Pool VIP", 
          descripcion: "Piscina infinity con vista panorámica, jacuzzi privado y servicio de bar",
          ubicacion: "Resort Las Palmeras, Piso 15",
          precio: 120
        }
      ];
      
      dispatch({ type: 'SET_ERROR', payload: `${errorMessage} (Mostrando datos de ejemplo)` });
      dispatch({ type: 'SET_PISCINAS', payload: piscinasEjemplo });
    }
  };

  // Obtener una piscina específica por ID
  const getPiscinaById = async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await axiosClient.get(API_ENDPOINTS.PISCINAS.GET_BY_ID(id));
      let data;
      if (response.data && response.data.piscina) {
        data = response.data.piscina;
      } else if (response.data) {
        data = response.data;
      }
      
      logAPISuccess(data, `GET /piscinas/${id}`);
      dispatch({ type: 'SET_PISCINA_SELECCIONADA', payload: data });
      return data;
    } catch (error) {
      logAPIError(error, `GET /piscinas/${id}`);
      dispatch({ type: 'SET_ERROR', payload: error.customMessage || 'Error al cargar la piscina desde el backend' });
      return null;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Agregar nueva piscina
  const agregarPiscina = async (piscina) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await axiosClient.post(API_ENDPOINTS.PISCINAS.CREATE, piscina);
      let nuevaPiscina;
      if (response.data && response.data.piscina) {
        nuevaPiscina = response.data.piscina;
      } else if (response.data) {
        nuevaPiscina = response.data;
      }
      
      logAPISuccess(nuevaPiscina, 'POST /piscinas');
      dispatch({ type: 'AGREGAR_PISCINA', payload: nuevaPiscina });
      dispatch({ type: 'SET_ERROR', payload: null });
      return { success: true, data: nuevaPiscina };
    } catch (error) {
      logAPIError(error, 'POST /piscinas');
      dispatch({ type: 'SET_ERROR', payload: error.customMessage || 'Error al agregar la piscina en el backend' });
      return { success: false, error: error.response?.data?.message || error.customMessage || 'Error desconocido' };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Actualizar piscina existente
  const actualizarPiscina = async (id, piscinaData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await axiosClient.put(API_ENDPOINTS.PISCINAS.UPDATE(id), piscinaData);
      let piscinaActualizada;
      if (response.data && response.data.piscina) {
        piscinaActualizada = response.data.piscina;
      } else if (response.data) {
        piscinaActualizada = response.data;
      }
      
      logAPISuccess(piscinaActualizada, `PUT /piscinas/${id}`);
      dispatch({ type: 'ACTUALIZAR_PISCINA', payload: piscinaActualizada });
      dispatch({ type: 'SET_ERROR', payload: null });
      return { success: true, data: piscinaActualizada };
    } catch (error) {
      logAPIError(error, `PUT /piscinas/${id}`);
      dispatch({ type: 'SET_ERROR', payload: error.customMessage || 'Error al actualizar la piscina en el backend' });
      return { success: false, error: error.response?.data?.message || error.customMessage || 'Error desconocido' };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Eliminar piscina
  const eliminarPiscina = async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await axiosClient.delete(API_ENDPOINTS.PISCINAS.DELETE(id));
      logAPISuccess({ id }, `DELETE /piscinas/${id}`);
      dispatch({ type: 'ELIMINAR_PISCINA', payload: id });
      dispatch({ type: 'SET_ERROR', payload: null });
      return { success: true };
    } catch (error) {
      logAPIError(error, `DELETE /piscinas/${id}`);
      dispatch({ type: 'SET_ERROR', payload: error.customMessage || 'Error al eliminar la piscina del backend' });
      return { success: false, error: error.response?.data?.message || error.customMessage || 'Error desconocido' };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Limpiar errores
  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  // Limpiar piscina seleccionada
  const clearPiscinaSeleccionada = () => {
    dispatch({ type: 'SET_PISCINA_SELECCIONADA', payload: null });
  };

  return (
    <PiscinaContext.Provider value={{ 
      piscinas: globalState.piscinas,
      piscinaSeleccionada: globalState.piscinaSeleccionada,
      loading: globalState.loading,
      error: globalState.error,
      getPiscinas,
      getPiscinaById,
      agregarPiscina,
      actualizarPiscina,
      eliminarPiscina,
      clearError,
      clearPiscinaSeleccionada
    }}>
      {props.children}
    </PiscinaContext.Provider>
  );
};

export default PiscinaState;
