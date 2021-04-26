import {USER_LOADED, AUTH_ERROR, REGISTER_SUCCESS, REGISTER_ERROR, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT} from '../actions/types';

const initState = {
    token: null,
    isAuthenticated: null,
    loading: true,
    user: null
}

export const authReducer = (state=initState, action) => {
    const {type, payload} = action;
    switch(type) {
        case USER_LOADED :
            return {
                ...state,
                token: payload.token,
                isAuthenticated: true,
                loading: false,
                user: payload.user 
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_ERROR:
        case AUTH_ERROR:
        case LOGIN_ERROR:
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        default:
            return state;
    }
}

export default authReducer;