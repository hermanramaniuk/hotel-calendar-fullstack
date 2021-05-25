import axios from '../utils/service';

import {
    GET_DATAS,
    GET_DATAS_ERRORS,
    GET_ROOMS,
    GET_ROOMS_ERRORS,
    UPDATE_DATE_INFO,
    UPDATE_DATE_INFO_ERRORS,
    CLEAR_ERRORS,
} from './types';

export const getDatas = postData => (dispatch) => {
    dispatch(clearErrors());
    const params = new URLSearchParams();
    params.append('type', postData.type);

    axios
        .post('/prices', params)
        .then(res => {
            dispatch({
                type: GET_DATAS,
                payload: res.data
            })})
        .catch(err => {
            dispatch({
                type: GET_DATAS_ERRORS,
                payload: err.response
            })
        });
}

export const getRooms = () => dispatch => {
    dispatch(clearErrors());
    axios
        .get('/rooms')
        .then(res =>
            dispatch({
                type: GET_ROOMS,
                payload: res.data
            }))
        .catch(err => {
            dispatch({
                type: GET_ROOMS_ERRORS,
                payload: err.response
            })
        });
}

export const updateDateInfo = postData => dispatch => {
    dispatch(clearErrors());
    const params = new URLSearchParams();
    params.append('id', postData.id);
    params.append('date', postData.date);
    params.append('price', parseInt(postData.price));
    params.append('status', postData.status);

    axios
        .post('/updates', params)
        .then(res =>
            dispatch({
                type: UPDATE_DATE_INFO,
                payload: res.data
            }))
        .catch(err => {
            dispatch({
                type: UPDATE_DATE_INFO_ERRORS,
                payload: err.response
            })
        });
}

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
};