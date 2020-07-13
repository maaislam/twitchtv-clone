const initialState = {
    isSignedIn: null
}

export default (state = initialState, { type }) => {
    switch (type) {

    case 'SIGN_IN':
        return { ...state, isSignedIn:true }
    case 'SIGN_OUT':
        return { ...state, isSignedIn:false }

    default:
        return state
    }
}
