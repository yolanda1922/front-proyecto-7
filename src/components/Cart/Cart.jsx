import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../contexts/Cart/CartContext';
import UserContext from '../../contexts/User/UserContext';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useContext(CartContext);
  const { isAuthenticated } = useContext(UserContext);

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Carrito de Reservas</h2>
        <p>Necesitas iniciar sesión para ver tu carrito.</p>
        <Link 
          to="/login"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            textDecoration: 'none',
            borderRadius: '5px',
            display: 'inline-block',
            marginTop: '1rem'
          }}
        >
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Carrito de Reservas</h2>
        <p>Tu carrito está vacío.</p>
        <Link 
          to="/piscinas"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            textDecoration: 'none',
            borderRadius: '5px',
            display: 'inline-block',
            marginTop: '1rem'
          }}
        >
          Ver Piscinas
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    alert(`¡Reserva confirmada! Total: $${getCartTotal()}`);
    clearCart();
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Carrito de Reservas</h2>
        <button
          onClick={clearCart}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Vaciar Carrito
        </button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        {items.map(item => (
          <div key={item.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
            backgroundColor: '#f9f9f9'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{item.nombre}</h3>
                <p style={{ margin: '0 0 0.5rem 0', color: '#666' }}>{item.descripcion}</p>
                <p style={{ margin: '0 0 0.5rem 0' }}>
                  <strong>Ubicación:</strong> {item.ubicacion}
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Precio por día:</strong> ${item.precio}
                </p>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    style={{
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    -
                  </button>
                  
                  <span style={{
                    padding: '5px 15px',
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    minWidth: '40px',
                    textAlign: 'center'
                  }}>
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    style={{
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    +
                  </button>
                </div>
                
                <div style={{ textAlign: 'right', minWidth: '80px' }}>
                  <strong>${item.precio * item.quantity}</strong>
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        border: '2px solid #007bff',
        borderRadius: '8px',
        padding: '1.5rem',
        backgroundColor: '#e3f2fd',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#1976d2' }}>
          Total de la Reserva: ${getCartTotal()}
        </h3>
        <p style={{ margin: '0 0 1rem 0', color: '#424242' }}>
          {items.reduce((total, item) => total + item.quantity, 0)} día(s) de reserva
        </p>
        <button
          onClick={handleCheckout}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}
        >
          Confirmar Reserva
        </button>
      </div>
    </div>
  );
};

export default Cart;