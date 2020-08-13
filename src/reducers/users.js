import {
    USERS_LOAD_DATA,
    USERS_GET_CURRENT_ITEM_ID,
    USERS_ADD_NEW_IMAGE,
    USERS_GET_CURRENT_EDITABLE_ITEM,
    USERS_EDIT_DATA_IMAGE
} from '../actions/users';

const initialState = {
    data:[],
    currentId: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case USERS_LOAD_DATA:
            return {
                ...state,
                data: action.payload
            }
        case USERS_GET_CURRENT_ITEM_ID:
            return {
                ...state,
                currentId: action.payload
            }
        case USERS_ADD_NEW_IMAGE:
            return {
                ...state,
                data: state.data.concat(action.payload)
            }
        case USERS_GET_CURRENT_EDITABLE_ITEM:
            return{
                ...state,
                currentId: action.payload
            }
        case USERS_EDIT_DATA_IMAGE:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}
