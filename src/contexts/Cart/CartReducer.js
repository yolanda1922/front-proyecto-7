const CartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                };
            } else {
                return {
                    ...state,
                    items: [...state.items, { ...action.payload, quantity: 1 }]
                };
            }
        }
        
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };
            
        case 'UPDATE_QUANTITY': {
            const { id, quantity } = action.payload;
            if (quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter(item => item.id !== id)
                };
            }
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === id
                        ? { ...item, quantity }
                        : item
                )
            };
        }
        
        case 'CLEAR_CART':
            return {
                ...state,
                items: []
            };
            
        case 'TOGGLE_CART':
            return {
                ...state,
                isOpen: !state.isOpen
            };
            
        default:
            return state;
    }
}

export default CartReducer;