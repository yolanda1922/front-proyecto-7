const UserReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_USER': 
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        case 'LOGOUT_USER':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        case 'REGISTER_USER':
            return {
                ...state,
                users: [...state.users, action.payload.newUser],
                user: action.payload.userWithoutPassword,
                isAuthenticated: true,
                isLoading: false
            };
        case 'UPDATE_USER':
            return {
                ...state,
                user: { ...state.user, ...action.payload }
            };
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload
            };
        default:
            return state;
    }
}

export default UserReducer;