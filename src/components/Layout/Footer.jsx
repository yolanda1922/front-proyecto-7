const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#343a40',
      color: 'white',
      textAlign: 'center',
      padding: '2rem 1rem',
      marginTop: '3rem'
    }}>
      <p>&copy; 2026 Sistema de Gestión de Piscinas. Todos los derechos reservados.</p>
      <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>
        Desarrollado con React, Vite y mucho ❤️
      </p>
    </footer>
  );
}


export default Footer;