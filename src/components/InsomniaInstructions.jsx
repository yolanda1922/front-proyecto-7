import { useState } from 'react';

const InsomniaInstructions = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: "1. Abrir Insomnia",
      content: (
        <div>
          <p>Abre Insomnia REST Client en tu computadora.</p>
          <p><strong>Si no lo tienes instalado:</strong></p>
          <ul>
            <li>Descarga desde: <code>https://insomnia.rest/download</code></li>
            <li>Instala y abre la aplicación</li>
          </ul>
        </div>
      )
    },
    {
      title: "2. Crear Colección",
      content: (
        <div>
          <p>En Insomnia:</p>
          <ul>
            <li>Click en "+" para crear nuevo request</li>
            <li>Selecciona "New Request"</li>
            <li>Nombre: "Agregar Piscina"</li>
            <li>Método: <strong>POST</strong></li>
          </ul>
        </div>
      )
    },
    {
      title: "3. Configurar URL",
      content: (
        <div>
          <p>Configura la URL del endpoint:</p>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '1rem', 
            borderRadius: '4px',
            fontFamily: 'monospace'
          }}>
            https://tu-backend-url.herokuapp.com/api/piscinas
          </div>
          <p><strong>Reemplaza</strong> <code>tu-backend-url</code> con la URL real de tu servidor MongoDB Atlas.</p>
        </div>
      )
    },
    {
      title: "4. Configurar Headers",
      content: (
        <div>
          <p>En la pestaña "Headers" agrega:</p>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '1rem', 
            borderRadius: '4px',
            fontFamily: 'monospace'
          }}>
            <strong>Content-Type:</strong> application/json
          </div>
        </div>
      )
    },
    {
      title: "5. Agregar Datos JSON",
      content: (
        <div>
          <p>En la pestaña "Body", selecciona "JSON" y copia este ejemplo:</p>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '1rem', 
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            whiteSpace: 'pre-wrap'
          }}>
{`{
  "nombre": "Piscina Olímpica Municipal",
  "descripcion": "Piscina de 50 metros con 8 carriles profesionales",
  "ubicacion": "Centro Deportivo Municipal, Av. Independencia 1250", 
  "precio": 75
}`}
          </div>
        </div>
      )
    },
    {
      title: "6. Enviar Request",
      content: (
        <div>
          <p>Click en <strong>"Send"</strong> para enviar la piscina a MongoDB Atlas.</p>
          <p><strong>Si todo está correcto, deberías ver:</strong></p>
          <div style={{ 
            backgroundColor: '#d4edda', 
            padding: '1rem', 
            borderRadius: '4px',
            border: '1px solid #c3e6cb'
          }}>
            ✅ Status: 200 o 201<br/>
            ✅ Respuesta con los datos de la piscina + _id de MongoDB
          </div>
        </div>
      )
    }
  ];
  
  const piscinasEjemplo = [
    {
      nombre: "Aqua Family Resort",
      descripcion: "Piscina familiar con área infantil, toboganes y zona de relax",
      ubicacion: "Club Familiar Los Pinos, Zona Norte", 
      precio: 45
    },
    {
      nombre: "Infinity Pool VIP",
      descripcion: "Piscina infinity con vista panorámica, jacuzzi privado",
      ubicacion: "Resort Las Palmeras, Piso 15",
      precio: 120
    },
    {
      nombre: "Hydro Therapy Center", 
      descripcion: "Piscina climatizada especializada en terapia acuática",
      ubicacion: "Centro de Salud Aquático, Zona Centro",
      precio: 60
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>
        
        <h2 style={{ marginBottom: '1rem', color: '#333' }}>
          🚀 Agregar Piscinas con Insomnia
        </h2>
        
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                style={{
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: currentStep === index ? '#007bff' : '#e9ecef',
                  color: currentStep === index ? 'white' : '#333',
                  cursor: 'pointer'
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          <div style={{
            border: '1px solid #dee2e6',
            borderRadius: '4px',
            padding: '1.5rem',
            minHeight: '300px'
          }}>
            <h3 style={{ color: '#007bff', marginBottom: '1rem' }}>
              {steps[currentStep].title}
            </h3>
            {steps[currentStep].content}
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: currentStep === 0 ? '#e9ecef' : 'white',
                cursor: currentStep === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              ← Anterior
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === steps.length - 1}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #007bff',
                borderRadius: '4px',
                backgroundColor: currentStep === steps.length - 1 ? '#e9ecef' : '#007bff',
                color: currentStep === steps.length - 1 ? '#666' : 'white',
                cursor: currentStep === steps.length - 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Siguiente →
            </button>
          </div>
        </div>
        
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '1rem',
          borderRadius: '4px',
          marginTop: '2rem'
        }}>
          <h4 style={{ margin: '0 0 1rem 0' }}>💡 Más Piscinas de Ejemplo:</h4>
          <div style={{ fontSize: '0.9rem' }}>
            {piscinasEjemplo.map((piscina, index) => (
              <details key={index} style={{ marginBottom: '0.5rem' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  {piscina.nombre}
                </summary>
                <pre style={{ 
                  fontSize: '0.8rem', 
                  backgroundColor: 'white', 
                  padding: '0.5rem',
                  borderRadius: '2px',
                  overflow: 'auto'
                }}>
{JSON.stringify(piscina, null, 2)}
                </pre>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsomniaInstructions;