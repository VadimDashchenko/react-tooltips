export const USERS_ADD_NEW_IMAGE = 'USERS_ADD_NEW_IMAGE';

export const USERS_EDIT_DATA_IMAGE = 'USERS_EDIT_DATA_IMAGE';

export const USERS_LOAD_DATA = 'USERS_LOAD_DATA';

export const USERS_GET_CURRENT_ITEM_ID = 'USERS_GET_CURRENT_ITEM_ID';

export const USERS_GET_CURRENT_EDITABLE_ITEM = 'USERS_GET_CURRENT_EDITABLE_ITEM';

export const addNewImage = payload => ({
    type: USERS_ADD_NEW_IMAGE,
    payload
});

export const editDataImage = payload => ({
    type: USERS_EDIT_DATA_IMAGE,
    payload
});

export const loadData = payload => ({
    type: USERS_LOAD_DATA,
    payload
});

export const getCurrentItemId = payload => ({
    type:USERS_GET_CURRENT_ITEM_ID,
    payload
});

export const getCurrentEditableItem = payload => ({
    type:USERS_GET_CURRENT_EDITABLE_ITEM,
    payload
})
