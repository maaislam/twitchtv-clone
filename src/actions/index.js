import streams from '../api/streams'



export const signIn = (userId) => ({
    type: 'SIGN_IN',
    payload: userId
    
});

export const signOut = () => ({
    type: 'SIGN_OUT',
    
});

/**
 * action creator for creating a new stream getState() is used to retreive
 * if the userId is present which is later checked in component with userId in streams
 * to determine the right owner of a video.
 */

export const createStream = (formValues) => {
    
    return async (dispatch, getState) => {

        const {userId} = getState().auth
        const response = await streams.post('/streams', {...formValues, userId});
        //const responseObject = Object.assign({}, response.data);
        const test = {[(response.data.id)-1]:response.data}
        console.log(test)

        dispatch({type: 'CREATE_STREAM', payload: test})
    }
    
};

export const fetchAllStream = () => {
    
    return async (dispatch) => {

        const response = await streams.get('/streams');
        /**
         * response comes back with an array so it is converted to object,
         * this helps with edit and post single method and in those cases respose retuns
         * an object.
         */
        const responseObject = Object.assign({}, response.data);
        console.log(responseObject)
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



/**
 * action creator for loading spinner
 */
