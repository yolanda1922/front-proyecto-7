import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PiscinaContext from '../../../contexts/Piscina/PiscinaContex';
import UserContext from '../../../contexts/User/UserContext';

const AdminPiscinas = () => {
  const navigate = useNavigate();
  const piscinaCtx = useContext(PiscinaContext);
  const userCtx = useContext(UserContext);
  
  const { 
    piscinas, 
    loading, 
    error, 
    getPiscinas, 
    agregarPiscina, 
    actualizarPiscina, 
    eliminarPiscina,
    clearError 
  } = piscinaCtx;
  
  const { user, isAuthenticated } = userCtx;
  
  const [showForm, setShowForm] = useState(false);
  const [editingPiscina, setEditingPiscina] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    ubicacion: '',
    precio: ''
  });

  useEffect(() => {
    // Verificar que el usuario sea admin
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/');
      return;
    }
    
    getPiscinas();
  }, [isAuthenticated, user, navigate, getPiscinas]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.descripcion || !formData.ubicacion || !formData.precio) {
      alert('Por favor completa todos los campos');
      return;
    }

    const piscinaData = {
      ...formData,
      precio: parseFloat(formData.precio)
    };

    let result;
    if (editingPiscina) {
      result = await actualizarPiscina(editingPiscina.id, piscinaData);
    } else {
      result = await agregarPiscina(piscinaData);
    }

    if (result.success) {
      alert(editingPiscina ? 'Piscina actualizada exitosamente' : 'Piscina agregada exitosamente');
      resetForm();
      setShowForm(false);
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  const handleEdit = (piscina) => {
    setEditingPiscina(piscina);
    setFormData({
      nombre: piscina.nombre,
      descripcion: piscina.descripcion,
      ubicacion: piscina.ubicacion,
      precio: piscina.precio.toString()
    });
    setShowForm(true);
  };

  const handleDelete = async (id, nombre) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${nombre}"?`)) {
      const result = await eliminarPiscina(id);
      if (result.success) {
        alert('Piscina eliminada exitosamente');
      } else {
        alert(`Error: ${result.error}`);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      descripcion: '',
      ubicacion: '',
      precio: ''
    });
    setEditingPiscina(null);
  };

  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Acceso Denegado</h2>
        <p>Solo los administradores pueden acceder a esta página</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Gestión de Piscinas - Admin</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          {showForm ? 'Cancelar' : '+ Agregar Piscina'}
        </button>
      </div>

      {/* Mostrar error si existe */}
      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          border: '1px solid #f5c6cb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{error}</span>
          <button
            onClick={clearError}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Formulario */}
      {showForm && (
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          border: '1px solid #dee2e6'
        }}>
          <h3>{editingPiscina ? 'Editar Piscina' : 'Agregar Nueva Piscina'}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Nombre:
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Precio por día:
                </label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Ubicación:
              </label>
              <input
                type="text"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Descripción:
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                required
                rows="3"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: loading ? '#ccc' : '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Guardando...' : (editingPiscina ? 'Actualizar' : 'Agregar')}
              </button>
              
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de piscinas */}
      <div>
        <h3>Piscinas Existentes ({piscinas.length})</h3>
        {loading && piscinas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Cargando piscinas...</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {piscinas.map(piscina => (
              <div key={piscina.id} style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1rem',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{piscina.nombre}</h4>
                  <p style={{ margin: '0 0 0.5rem 0', color: '#666' }}>{piscina.descripcion}</p>
                  <p style={{ margin: '0 0 0.5rem 0' }}>
                    <strong>Ubicación:</strong> {piscina.ubicacion}
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>Precio:</strong> ${piscina.precio}/día
                  </p>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                  <button
                    onClick={() => handleEdit(piscina)}
                    style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}
                  >
                    Editar
                  </button>
                  
                  <button
                    onClick={() => handleDelete(piscina.id, piscina.nombre)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPiscinas;