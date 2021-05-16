
export const appendConverAction = (data)=> ({type: 'appendNewConver', data})
export const updateChatDataAction = (data)=> ({type: 'updateChatData', data})
export const updateHistoryAction = (data)=> ({type: 'updateOneHistory', data})

// 向数组里的history追加一个新的记录
export const syncAppendConverAction = (data)=> {

    const UID = localStorage.getItem('uid');

    const history = (data.history || []).map(cover=> ({
        ...cover,
        isMySelf: cover.talker === UID
    }))
    const lastHistory = {
        ...data.lastHistory,
        isMySelf: (data.lastHistory || {}).talker === UID,
    }
    
    return async dispatch=> {
        dispatch(appendConverAction({
            ...data,
            history,
            lastHistory,
        }))
    }
}

// 更新聊天记录并自动识别发送者和接受者
export const syncUpdateChatDataAction = (data)=> {
    const UID = localStorage.getItem('uid');

    const mapData = data.map(item=> ({
        ...item,
        history: (item.history || []).map(cover=> ({
            ...cover,
            isMySelf: cover.talker === UID
        }))
    }))
    return async dispatch=> {
        dispatch(updateChatDataAction(mapData))
    }
}

export const syncUpdateHistoryAction = (data)=> {
    const UID = localStorage.getItem('uid');
    return async dispatch=> {
        dispatch(updateHistoryAction({
            converObj: {...data, isMySelf: data.talker === UID, lastHistory: data},
            converId: data.converId,
        }))
    }
}

