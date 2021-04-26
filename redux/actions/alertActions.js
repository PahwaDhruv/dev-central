import {v4 as uuid} from 'uuid';
import * as t from './types';

export const setAlert = (text, type, timeout=5000) => dispatch => {
    const alert = {
        id: uuid(),
        type: type,
        text: text
    }
    dispatch({
        type: t.SET_ALERT,
        payload: alert
    })
    setTimeout(() => {
        dispatch({
            type: t.REMOVE_ALERT,
            payload: alert.id
        })
    }, timeout)
}