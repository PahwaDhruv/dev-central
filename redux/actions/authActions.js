import axios from 'axios';
import {setAlert} from './alertActions';
import {USER_LOADED, AUTH_ERROR, REGISTER_SUCCESS, REGISTER_ERROR, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT} from './types';

//Load User
export const loadUser = () => async dispatch => {
    try {
        const res = await axios.get('/api/auth');
        console.log(res.data);
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        console.log(err.message);
        dispatch({
            type: AUTH_ERROR
        })
    }
    
}

//Register user
export const registerUser = (user) => async dispatch => {
    try {
        const res = await axios.post('/api/register', user);
        console.log(res.data)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data.token
        })
        dispatch(loadUser());
        // dispatch(setAlert('Register Success. Please Login to continue', 'success', 3000));
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach((error, idx) => setTimeout(() => {
                dispatch(setAlert(error, 'danger'))
            }, idx * 1000))
        }
        console.log(err.message)
        dispatch({
            type: REGISTER_ERROR
        })
    }
}

export const loginUser = (auth) => async dispatch => {
    console.log(auth);
    try {
        const res = await axios.post('/api/login', auth);
        console.log(res.data);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.token
        })
        dispatch(loadUser());
        
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach((error, idx) => setTimeout(() => {
                dispatch(setAlert(error, 'danger'))
            }, idx * 1000))
        }
        console.log(err.message)
        dispatch({
            type: LOGIN_ERROR
        })
    }
}

export const logout = () => async dispatch => {
    try {
        const res = await axios.post('/api/logout');
        if(res.data && res.data.status){    
            dispatch({
                type: LOGOUT
            })
        }
    } catch (err) {
        console.log(err.message);
        dispatch({
            type: LOGOUT
        })
    }
};