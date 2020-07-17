import streams from '../api/streams'

import history from '../history'


export const signIn = (signedUser) => ({
    type: 'SIGN_IN',
    payload: signedUser
    
});

export const signOut = () => ({
    type: 'SIGN_OUT',
    
});
export const openUserCard = () => ({
    type: 'USER_CARD',
    
});
export const userCardOutsideClick = () => ({
    type: 'USER_CARD_OUTSIDE_CLICK',
    
});

/**
 * action creator for creating a new stream getState() is used to retreive
 * if the userId is present which is later checked in component with userId in streams
 * to determine the right owner of a video.
 */

export const createStream = (formValues) => {
    
    return async (dispatch, getState) => {

        const {user} = getState().auth
        const response = await streams.post('/streams', {...formValues, ...user});
        //const responseObject = Object.assign({}, response.data);
        const test = {[response.data.id]:response.data}
        //console.log(test)

        dispatch({type: 'CREATE_STREAM', payload: test});
        history.push('/')
    }
    
};

export const fetchAllStream = () => {
    
    return async (dispatch) => {

        const response = await streams.get('/streams');
        /**
         * *response comes back with an array so it is converted to object,
         * *this helps with edit and post single method and in those cases respose retuns
         * *an object.
         */
        //console.log(response.data)
        dispatch({type: 'FETCH_ALL_STREAM', payload: response.data})
    }
    
};
export const fetchSingleStream = (id) => {
    
    return async (dispatch) => {

        const response = await streams.get(`/streams/${id}`);

        dispatch({type: 'FETCH_SINGLE_STREAM', payload: response.data})
    }
    
};
export const editStream = (id,formValues) => {
    
    return async (dispatch) => {

        const response = await streams.patch(`/streams/${id}`, formValues);

        dispatch({type: 'EDIT_STREAM', payload: response.data});

        history.push('/')
    }
    
};

/**
 * *action creator for deleting stream
 */
export const deleteStream = (id) => {
    
    return async (dispatch) => {

        await streams.delete(`/streams/${id}`);

        dispatch({type: 'DELETE_STREAM', payload: id});

       history.push('/')
    }
    
};



