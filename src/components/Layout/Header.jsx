import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/User/UserContext";
import CartContext from "../../contexts/Cart/CartContext";

const Header = () => {
  const { user, isAuthenticated, logoutUser } = useContext(UserContext);
  const { getCartItemsCount } = useContext(CartContext);

  return (
    <header style={{ 
      backgroundColor: '#007bff', 
      padding: '1rem', 
      marginBottom: '2rem' 
    }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ul style={{ 
          listStyle: 'none', 
          margin: 0, 
          padding: 0, 
          display: 'flex', 
          gap: '2rem' 
        }}>
          <li>
            <Link 
              to="/" 
              style={{ 
                color: 'white', 
                textDecoration: 'none', 
                fontSize: '1.1rem' 
              }}
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link 
              to="/piscinas" 
              style={{ 
                color: 'white', 
                textDecoration: 'none', 
                fontSize: '1.1rem' 
              }}
            >
              Piscinas
            </Link>
          </li>
          {isAuthenticated && user?.role === 'admin' && (
            <li>
              <Link 
                to="/admin/piscinas" 
                style={{ 
                  color: 'white', 
                  textDecoration: 'none', 
                  fontSize: '1.1rem',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontWeight: 'bold'
                }}
              >
                🛠️ Admin
              </Link>
            </li>
          )}
        </ul>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {isAuthenticated && (
            <Link 
              to="/cart" 
              style={{ 
                color: 'white', 
                textDecoration: 'none', 
                fontSize: '1rem',
                backgroundColor: 'rgba(255,255,255,0.2)',
                padding: '8px 12px',
                borderRadius: '4px',
                position: 'relative'
              }}
            >
              🛒 Carrito
              {getCartItemsCount() > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '0.7rem',
                  fontWeight: 'bold'
                }}>
                  {getCartItemsCount()}
                </span>
              )}
            </Link>
          )}
          
          {isAuthenticated ? (
            <>
              <span style={{ color: 'white', fontSize: '0.9rem' }}>
                Bienvenido, {user?.name}
              </span>
              <Link 
                to="/profile" 
                style={{ 
                  color: 'white', 
                  textDecoration: 'none', 
                  fontSize: '1rem' 
                }}
              >
                Perfil
              </Link>
              <button
                onClick={logoutUser}
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: '1px solid white',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                style={{ 
                  color: 'white', 
                  textDecoration: 'none', 
                  fontSize: '1rem',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  padding: '8px 12px',
                  borderRadius: '4px'
                }}
              >
                Iniciar Sesión
              </Link>
              <Link 
                to="/register" 
                style={{ 
                  color: 'white', 
                  textDecoration: 'none', 
                  fontSize: '1rem',
                  backgroundColor: '#28a745',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontWeight: 'bold'
                }}
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;