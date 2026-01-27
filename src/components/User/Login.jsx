import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../../contexts/User/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const { loginUser, isLoading } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      return;
    }

    const result = loginUser(formData.email, formData.password);
    
    if (result.success) {
      navigate('/piscinas');
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '2rem auto', 
      padding: '2rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
        Iniciar Sesión
      </h2>
      
      {error && (
        <div style={{ 
          color: 'red', 
          backgroundColor: '#ffe6e6',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            placeholder="Ingresa tu email"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Contraseña:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: isLoading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1.1rem',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
      </form>

      <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
        <p><strong>Usuarios de prueba:</strong></p>
        <p>Usuario: juan@example.com - 123456</p>
        <p>Admin: admin@example.com - admin123</p>
      </div>

      <div style={{ 
        textAlign: 'center', 
        marginTop: '1.5rem', 
        paddingTop: '1rem',
        borderTop: '1px solid #ddd'
      }}>
        <p style={{ margin: '0 0 1rem 0', color: '#666' }}>
          ¿No tienes una cuenta?
        </p>
        <Link 
          to="/register"
          style={{
            color: '#007bff',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          Crear Cuenta Nueva
        </Link>
      </div>
    </div>
  );
};

export default Login;