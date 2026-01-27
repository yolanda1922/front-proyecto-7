import { useContext } from 'react';
import UserContext from '../../contexts/User/UserContext';

const Profile = () => {
  const { user, logoutUser } = useContext(UserContext);

  const handleLogout = () => {
    logoutUser();
  };

  if (!user) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>No hay usuario autenticado</h2>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '2rem auto', 
      padding: '2rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
        Perfil de Usuario
      </h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Nombre:</strong> {user.name}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Email:</strong> {user.email}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Rol:</strong> <span style={{ 
            padding: '4px 8px',
            backgroundColor: user.role === 'admin' ? '#28a745' : '#007bff',
            color: 'white',
            borderRadius: '4px',
            fontSize: '0.85rem'
          }}>
            {user.role === 'admin' ? 'Administrador' : 'Usuario'}
          </span>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Profile;