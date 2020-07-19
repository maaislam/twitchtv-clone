const initialState = {
    isSignedIn: null,
    userCard:false,
    user:{}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case 'SIGN_IN':
        return { ...state, isSignedIn:true, user: payload }
    case 'SIGN_OUT':
        return { ...state, isSignedIn:false, user:{}, userCard:false }
    case 'USER_CARD':
        return { ...state, userCard:!state.userCard }
   

    default:
        return state
    }
}
