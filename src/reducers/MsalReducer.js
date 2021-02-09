const MsalReducer = (initialState = [], action) => {

    switch(action.type){
        case 'LOGIN':
            return state.concat(action.identity)
        default:
            return initialState
    };
};

export default MsalReducer;