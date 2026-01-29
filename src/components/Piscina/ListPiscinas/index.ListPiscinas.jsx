import { useContext, useEffect, useState } from 'react'; 
import PiscinaContext from '../../../contexts/Piscina/PiscinaContex';
import UserContext from '../../../contexts/User/UserContext';
import CartContext from '../../../contexts/Cart/CartContext';
import InsomniaInstructions from '../../InsomniaInstructions';

const PiscinaList = () => {
  const piscinaCtx = useContext(PiscinaContext);
  const userCtx = useContext(UserContext);
  const cartCtx = useContext(CartContext);
  const { piscinas, loading, error, getPiscinas, clearError } = piscinaCtx;
  const { user, isAuthenticated } = userCtx;
  const { addToCart } = cartCtx;
  const [showInsomniaModal, setShowInsomniaModal] = useState(false);

  // Refrescar piscinas al montar el componente
  useEffect(() => {
    getPiscinas();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddToCart = (piscina) => {
    addToCart(piscina);
    alert(`${piscina.nombre} agregada al carrito!`);
  };

  const handleRetry = () => {
    clearError();
    getPiscinas();
  };

  // Mostrar estado de carga
  if (loading && piscinas.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>🔄 Conectando con MongoDB Atlas...</h2>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          Obteniendo las piscinas desde la base de datos
        </p>
        <div style={{ 
          margin: '1rem auto',
          width: '50px',
          height: '50px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #007bff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div style={{ padding: '0 1rem' }}>
      {/* Mostrar error si existe */}
      {error && (
        <div style={{
          backgroundColor: error.includes('ejemplo') ? '#fff3cd' : '#f8d7da',
          color: error.includes('ejemplo') ? '#856404' : '#721c24',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          border: error.includes('ejemplo') ? '1px solid #ffc107' : '1px solid #f5c6cb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <strong>
              {error.includes('ejemplo') ? '⚠️ Modo Demostración:' : '❌ Error:'}
            </strong>
            <br />
            <span>{error}</span>
            {error.includes('ejemplo') && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                Para usar datos reales, configura tu backend MongoDB Atlas y actualiza la URL en el archivo .env
              </div>
            )}
          </div>
          <button
            onClick={handleRetry}
            style={{
              backgroundColor: error.includes('ejemplo') ? '#ffc107' : '#dc3545',
              color: error.includes('ejemplo') ? '#212529' : 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            🔄 Intentar Conectar
          </button>
        </div>
      )}

      {/* Indicador de carga cuando hay datos */}
      {loading && piscinas.length > 0 && (
        <div style={{
          backgroundColor: '#fff3cd',
          color: '#856404',
          padding: '0.75rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          border: '1px solid #ffeaa7',
          textAlign: 'center'
        }}>
          Actualizando datos...
        </div>
      )}

      {isAuthenticated && (
        <div style={{ 
          backgroundColor: '#e3f2fd', 
          padding: '1rem', 
          borderRadius: '8px',
          marginBottom: '2rem',
          border: '1px solid #2196f3'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#1976d2' }}>
            ¡Hola, {user?.name}!
          </h3>
          <p style={{ margin: 0, color: '#424242' }}>
            {user?.role === 'admin' ? 
              'Como administrador, puedes gestionar todas las piscinas.' : 
              'Explora nuestras piscinas disponibles para reservar. Agrega las que te gusten al carrito.'
            }
          </p>
        </div>
      )}
      
      
      
      {!isAuthenticated && (
        <div style={{ 
          backgroundColor: '#fff3cd', 
          padding: '1rem', 
          borderRadius: '8px',
          marginBottom: '2rem',
          border: '1px solid #ffc107'
        }}>
          <p style={{ margin: 0, color: '#856404' }}>
            <strong>Nota:</strong> Inicia sesión para agregar piscinas a tu carrito y hacer reservas.
          </p>
        </div>
      )}
      
      <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
        {
          piscinas && Array.isArray(piscinas) && piscinas.length > 0 ? piscinas.map((piscina) => (
            <div key={piscina._id || piscina.id} style={{ 
              border: '1px solid #ccc', 
              padding: '15px', 
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
              position: 'relative'
            }}>
              <h2 style={{ color: '#333', marginTop: 0 }}>{piscina.nombre}</h2>
              <p><strong>Descripción:</strong> {piscina.descripcion}</p>
              <p><strong>Ubicación:</strong> {piscina.ubicacion}</p>
              <p><strong>Precio por día:</strong> ${piscina.precio}</p>
              
              {/* Mostrar información del origen de datos */}
              <div style={{ 
                fontSize: '0.8rem', 
                color: '#666', 
                fontStyle: 'italic',
                marginTop: '0.5rem',
                padding: '0.5rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px'
              }}>
                {piscina._id?.startsWith('ejemplo') ? (
                  <span style={{ color: '#856404' }}>
                    📝 Datos de ejemplo - Configura MongoDB Atlas para datos reales
                  </span>
                ) : (
                  <span style={{ color: '#28a745' }}>
                    ✅ Desde MongoDB Atlas - ID: {piscina._id}
                  </span>
                )}
              </div>
              
              {isAuthenticated && (
                <div style={{ marginTop: '1rem', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {user?.role === 'admin' ? (
                    <>
                      <button style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}>
                        Gestionar
                      </button>
                      
                      <button style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}>
                        Ver Detalles
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => handleAddToCart(piscina)}
                        style={{
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: 'bold'
                        }}
                      >
                        🛒 Agregar al Carrito
                      </button>
                      
                      <button style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}>
                        Ver Detalles
                      </button>
                      
                      <button style={{
                        backgroundColor: '#ffc107',
                        color: '#212529',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}>
                        Reservar Ahora
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          )) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px',
              border: '2px dashed #dee2e6' 
            }}>
              {error ? (
                <div>
                  <h3 style={{ color: '#dc3545', marginBottom: '1rem' }}>
                    ❌ No se pudieron cargar las piscinas
                  </h3>
                  <p style={{ color: '#666', marginBottom: '1rem' }}>
                    Verifica que el servidor MongoDB Atlas esté funcionando correctamente.
                  </p>
                  <button
                    onClick={handleRetry}
                    style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '1rem'
                    }}
                  >
                    🔄 Reintentar Conexión
                  </button>
                </div>
              ) : (
                <div>
                  <h3 style={{ color: '#6c757d', marginBottom: '1rem' }}>
                    📊 No hay piscinas disponibles
                  </h3>
                  <p style={{ color: '#666' }}>
                    La base de datos MongoDB Atlas está vacía o no contiene piscinas.
                  </p>
                </div>
              )}
            </div>
          )
        }
      </div>
      
      {/* Modal de instrucciones de Insomnia */}
      {showInsomniaModal && (
        <InsomniaInstructions onClose={() => setShowInsomniaModal(false)} />
      )}
    </div>
  );
}

export default PiscinaList;