import { useReducer } from "react";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";

const UserState = (props) => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    users: [
      {
        id: 1,
        name: "Juan Pérez",
        email: "juan@example.com",
        password: "123456",
        role: "user"
      },
      {
        id: 2,
        name: "Admin Usuario",
        email: "admin@example.com", 
        password: "admin123",
        role: "admin"
      }
    ]
  };

  const [globalState, dispatch] = useReducer(UserReducer, initialState);

  const registerUser = (userData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Verificar si el email ya existe
    const existingUser = globalState.users.find(u => u.email === userData.email);
    
    if (existingUser) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, message: 'Este email ya está registrado' };
    }
    
    // Crear nuevo usuario
    const newUser = {
      id: Date.now(), // ID simple basado en timestamp
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: 'user' // Por defecto todos son usuarios regulares
    };
    
    const { password: _, ...userWithoutPassword } = newUser;
    
    dispatch({ 
      type: 'REGISTER_USER', 
      payload: { newUser, userWithoutPassword }
    });
    
    return { success: true, message: 'Usuario registrado exitosamente' };
  };

  const loginUser = (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    const foundUser = globalState.users.find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      dispatch({ type: 'LOGIN_USER', payload: userWithoutPassword });
      return { success: true, message: 'Login exitoso' };
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, message: 'Credenciales inválidas' };
    }
  };

  const logoutUser = () => {
    dispatch({ type: 'LOGOUT_USER' });
  };

  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  return (
    <UserContext.Provider value={{
      user: globalState.user,
      isAuthenticated: globalState.isAuthenticated,
      isLoading: globalState.isLoading,
      users: globalState.users,
      loginUser,
      registerUser,
      logoutUser,
      updateUser
    }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;