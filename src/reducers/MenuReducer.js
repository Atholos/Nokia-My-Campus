const MenuReducer = (state = {}, action) => {

    switch(action.type){

        case 'MENU':
            if(action.value !== {})
                return state = action.value;
            else
                return state;

        default:
            return state;
    }
};

export default MenuReducer;
