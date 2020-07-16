
import _ from 'lodash';



const initialState = {
    isFetching:true,
    streamList:{}
    
    
};

export default (state = initialState, { type, payload }) => {
    
    
    
    switch (type) {



    case 'CREATE_STREAM':
        return { ...state, streamList:{...state.streamList,...payload}, isFetching:false};

    case 'FETCH_ALL_STREAM':
   
        return { ...state, streamList: {...state.streamList,..._.mapKeys(payload,'id')}, isFetching:false};

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





 /**
         * 
         * / ES6 code
            const key1 = 'one',
            obj = {
                [key1]: 1,
                two: 2,
                three: 3
            };

            // obj.one = 1, obj.two = 2, obj.three = 3


         */