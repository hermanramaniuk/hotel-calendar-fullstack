import { 
    GET_DATAS,
    GET_ROOMS,
    UPDATE_DATE_INFO,
} from '../actions/types';

const initialState = {
    datas: [],
    rooms: [],
    date_info: {},
    type: 0
}

export default (state=initialState, action) => {
    switch (action.type) {
        case GET_DATAS:
            return {
                ...state,
                datas: action.payload
            };
        case GET_ROOMS:
            return {
                ...state,
                rooms: action.payload
            };
        case UPDATE_DATE_INFO:
            const updated = action.payload;
            const id = state.datas[updated.id].findIndex((data) => {
                return updated.id === data.room_id && updated.date === data.date;
            });
            state.datas[updated.id][id] = updated;
            console.log('room_id', state.datas);
            return {
                ...state,
                rooms: state.rooms
            }
        default:
            return state;
    }
}
