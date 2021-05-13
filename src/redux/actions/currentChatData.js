const UID = localStorage.getItem('uid');

export const addChatDataAction = (data)=> ({type: 'addCurrentChatData', data})
export const updateChatDataAction = (data)=> ({type: 'updateCurrentChatData', data})
export const addSyncChatDataAction = (data)=> {
    data.isMySelf = data.talker === UID;
    return async dispatch=> {
        console.log(data, 11111);
        dispatch(addChatDataAction(data))
    }
}

export const updateSyncChatDataAction = (data)=> {
    const mapCurrentChatList = ((data.history) || []).map(item=> ({
        ...item,
        isMySelf:item.talker === UID,
    }))
    
    data.history = mapCurrentChatList;
    let lastHistory = data.lastHistory || {};
    lastHistory.isMySelf = lastHistory.talker === UID;
    return async dispatch=> {
        dispatch(updateChatDataAction(data))
    }
}

