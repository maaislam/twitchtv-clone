import streams from '../api/streams'



export const signIn = (userId) => ({
    type: 'SIGN_IN',
    payload: userId
    
});

export const signOut = () => ({
    type: 'SIGN_OUT',
    
});


export const createStream = (formValues) => {
    
    return async (dispatch, getState) => {

        const {userId} = getState().auth
        const response = await streams.post('/streams', {...formValues, userId});

        console.log(response.data)

        dispatch({type: 'CREATE_STREAM', payload: response.data})
    }
    
};

export const fetchAllStream = () => {
    
    return async (dispatch) => {

        const response = await streams.get('/streams');
        const responseObject = Object.assign({}, response.data);
        //console.log(test)
        dispatch({type: 'FETCH_ALL_STREAM', payload: responseObject})
    }
    
};
export const fetchSingleStream = (id,formValues) => {
    
    return async (dispatch) => {

        const response = await streams.get(`/streams/${id}`, formValues);

        dispatch({type: 'FETCH_SINGLE_STREAM', payload: response.data})
    }
    
};
export const editStream = (id) => {
    
    return async (dispatch) => {

        const response = await streams.put(`/streams/${id}`);

        dispatch({type: 'EDIT_STREAM', payload: response.data})
    }
    
};
export const deleteStream = (id) => {
    
    return async (dispatch) => {

        await streams.delete(`/streams/${id}`);

        dispatch({type: 'DELETE_STREAM', payload: id})
    }
    
};



