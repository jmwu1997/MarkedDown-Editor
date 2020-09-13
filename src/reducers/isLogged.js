import {SET_CURRENT_USER} from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
    isAuthenticated: false,
    user: {}
}


const loggedReducer = (state = initialState, action = {}) => {
    // switch (action.type) {
    //     case 'SIGN_IN':
    //         return !state;
    //     default: 
    //         return state;
    // }

    switch(action.type){
        case SET_CURRENT_USER:
            return{
                isAuthenticated: !isEmpty(action.user),
                user: action.user
            };
            default: return state;
    }
};

export default loggedReducer;