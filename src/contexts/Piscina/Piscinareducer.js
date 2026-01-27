const PiscinaReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        case 'GET_PISCINAS':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'SET_PISCINAS':
            return {
                ...state,
                piscinas: action.payload,
                loading: false,
                error: null
            };
        case 'SET_PISCINA_SELECCIONADA':
            return {
                ...state,
                piscinaSeleccionada: action.payload
            };
        case 'AGREGAR_PISCINA': 
            return {
                ...state,
                piscinas: [...state.piscinas, action.payload],
                loading: false,
                error: null
            };
        case 'ACTUALIZAR_PISCINA':
            return {
                ...state,
                piscinas: state.piscinas.map(piscina => 
                    piscina.id === action.payload.id ? action.payload : piscina
                ),
                piscinaSeleccionada: state.piscinaSeleccionada?.id === action.payload.id 
                    ? action.payload 
                    : state.piscinaSeleccionada,
                loading: false,
                error: null
            };
        case 'ELIMINAR_PISCINA':
            return {
                ...state,
                piscinas: state.piscinas.filter(piscina => piscina.id !== action.payload),
                piscinaSeleccionada: state.piscinaSeleccionada?.id === action.payload 
                    ? null 
                    : state.piscinaSeleccionada,
                loading: false,
                error: null
            };
        default:
            return state;
    }
}

export default PiscinaReducer;

