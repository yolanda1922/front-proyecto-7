import { useReducer } from "react";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";

const CartState = (props) => {
  const initialState = {
    items: [],
    isOpen: false
  };

  const [globalState, dispatch] = useReducer(CartReducer, initialState);

  const addToCart = (piscina) => {
    dispatch({ type: 'ADD_TO_CART', payload: piscina });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const getCartTotal = () => {
    return globalState.items.reduce((total, item) => {
      return total + (item.precio * item.quantity);
    }, 0);
  };

  const getCartItemsCount = () => {
    return globalState.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items: globalState.items,
      isOpen: globalState.isOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleCart,
      getCartTotal,
      getCartItemsCount
    }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;