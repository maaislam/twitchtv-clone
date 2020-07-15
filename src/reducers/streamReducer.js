
import _ from 'lodash';

//const initialState = {}

export default (state = {}, { type, payload }) => {
    switch (type) {

    case 'CREATE_STREAM':
        return { ...state, [(payload.id)-1]:payload };

    case 'FETCH_ALL_STREAM':
        return { ...state, ...payload };

    case 'FETCH_SINGLE_STREAM':
        return { ...state, [(payload.id)-1]:payload };
    
    case 'EDIT_STREAM':
        return { ...state, [(payload.id)-1]:payload };
    
    case 'DELETE_STREAM':
        return _.omit(state, payload);
    
    

    default:
        return state
    }
}
