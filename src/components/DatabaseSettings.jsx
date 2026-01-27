import { useState } from 'react';

const DatabaseSettings = () => {
  const [currentUrl] = useState(
    import.meta.env.VITE_APP_BASE_API || 'No configurado'
  );
  
  const [newUrl, setNewUrl] = useState('');
  
  const commonUrls = [
    {
      name: 'Desarrollo Local',
      url: 'http://localhost:3003/api',
      description: 'Para desarrollo local con servidor Node.js'
    },
    {
      name: 'MongoDB Atlas (Heroku)',
      url: 'https://tu-backend-mongodb.herokuapp.com/api',
      description: 'Servidor en Heroku conectado a MongoDB Atlas'
    },
    {
      name: 'MongoDB Atlas (Vercel)',
      url: 'https://tu-backend-mongodb.vercel.app/api',
      description: 'Servidor en Vercel conectado a MongoDB Atlas'
    },
    {
      name: 'MongoDB Atlas (Railway)',
      url: 'https://tu-backend-mongodb.railway.app/api',
      description: 'Servidor en Railway conectado a MongoDB Atlas'
    }
  ];

  const handleUrlChange = (url) => {
    setNewUrl(url);
  };

  const applyNewUrl = () => {
    if (newUrl) {
      alert(`Para aplicar la nueva URL: ${newUrl}\n\n1. Actualiza el archivo .env con:\nVITE_APP_BASE_API=${newUrl}\n\n2. Reinicia el servidor de desarrollo\n\n3. Recarga la página`);
    }
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '2rem auto', 
      padding: '2rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #dee2e6'
    }}>
      <h2 style={{ color: '#333', marginBottom: '1rem' }}>
        ⚙️ Configuración de Base de Datos
      </h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#666' }}>URL Actual del Backend:</h3>
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#e9ecef', 
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '0.9rem'
        }}>
          {currentUrl}
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#666' }}>URLs Comunes:</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {commonUrls.map((config, index) => (
            <div 
              key={index}
              style={{ 
                padding: '1rem', 
                backgroundColor: 'white', 
                borderRadius: '4px',
                border: '1px solid #dee2e6'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ color: '#007bff' }}>{config.name}</strong>
                  <p style={{ margin: '0.5rem 0', color: '#666', fontSize: '0.9rem' }}>
                    {config.description}
                  </p>
                  <code style={{ 
                    fontSize: '0.8rem', 
                    color: '#dc3545',
                    backgroundColor: '#f8f9fa',
                    padding: '2px 4px',
                    borderRadius: '2px'
                  }}>
                    {config.url}
                  </code>
                </div>
                <button
                  onClick={() => handleUrlChange(config.url)}
                  style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Seleccionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#666' }}>URL Personalizada:</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="https://tu-servidor.com/api"
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
          <button
            onClick={applyNewUrl}
            disabled={!newUrl}
            style={{
              backgroundColor: newUrl ? '#28a745' : '#ccc',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: newUrl ? 'pointer' : 'not-allowed',
              fontSize: '1rem'
            }}
          >
            Aplicar
          </button>
        </div>
      </div>

      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#fff3cd', 
        border: '1px solid #ffeaa7',
        borderRadius: '4px'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#856404' }}>
          📝 Instrucciones:
        </h4>
        <ol style={{ margin: 0, paddingLeft: '1.5rem', color: '#856404' }}>
          <li>Selecciona la URL de tu servidor MongoDB Atlas</li>
          <li>Actualiza el archivo <code>.env</code> con la nueva URL</li>
          <li>Reinicia el servidor de desarrollo: <code>npm run dev</code></li>
          <li>Verifica la conexión en la consola del navegador</li>
        </ol>
      </div>
    </div>
  );
};

export default DatabaseSettings;