import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bienvenido a la Aplicación de Piscinas</h1>
      <p>Gestiona y explora diferentes piscinas disponibles desde MongoDB Atlas.</p>
      
      <div style={{ marginTop: '2rem' }}>
        <Link 
          to="/piscinas" 
          style={{ 
            backgroundColor: '#007bff', 
            color: 'white', 
            padding: '15px 20px', 
            textDecoration: 'none', 
            borderRadius: '8px',
            fontSize: '1.1rem',
            display: 'inline-block',
            fontWeight: 'bold'
          }}
        >
          🏊‍♀️ Ver Lista de Piscinas
        </Link>
      </div>
      
      <div style={{ 
        marginTop: '3rem', 
        padding: '1.5rem', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h3 style={{ color: '#495057', marginBottom: '1rem' }}>
          🔗 Estado de Conexión a MongoDB Atlas
        </h3>
        <p style={{ margin: 0, color: '#6c757d' }}>
          La aplicación está configurada para conectarse a una base de datos MongoDB Atlas.
          Las piscinas que veas serán cargadas directamente desde la base de datos remota.
        </p>
      </div>
    </div>
  );
}

export default Home;