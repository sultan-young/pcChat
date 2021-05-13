// 当前选中人的聊天记录
const chatData = (prevState = {}, action)=> {
    const {type, data = {}} = action;
    switch (type) {
        case 'addCurrentChatData':
            return {
                ...prevState,
                lastHistory: data,
                history: [...prevState.history, data]
            };
        case 'updateCurrentChatData':
            return data;
        default:
            return prevState;
    }
}

export default chatData;
