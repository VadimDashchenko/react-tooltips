import {createSelector} from 'reselect';

export const getData = createSelector(
    state => state.users.data,
    dataList => dataList
)

export const getCurrentDataItem = createSelector(
    getData,
    state => state.users.currentId,
    (dataList, currentId) => {
        let data;
        if(dataList !== ''){
            data = dataList.find(item => item.id === currentId);
        }
        return data;
    }
)

export const getCurrentEditableDataItem = createSelector(
    getData,
    state => state.users.currentId,
    (dataList, currentId) => {
        let data;
        if(dataList !== ''){
            data = dataList.find(item => item.id === currentId);
        }
        return data;
    }
)
