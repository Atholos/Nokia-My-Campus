const NewsReducer = (state = {}, action) => {

    switch(action.type){

        case 'CURRENT':
            if(action.value !== {})
                return state = action.value;
            else
                return state;

        default:
            return state;
    };
};

export default NewsReducer;
