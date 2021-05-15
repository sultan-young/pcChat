// 当前选中人的聊天记录
const chatData = (prevState = [], action)=> {
    const {type, data } = action;
    switch (type) {
        // 给聊天数组对应的会话追加一条聊天记录
        case 'updateOneHistory':
            const {converId, converObj = {}} = data;
            let index = prevState.findIndex(item=>item._id === converId)
            let targetObj = prevState[index] || {};
            prevState[index] = {...targetObj, history: [...(targetObj.history || []), converObj], lastHistory: converObj};
            return [...prevState];
        // 给聊天数组追加一个新的会话
        case 'appendNewConver':
            return [
                ...prevState,
                data,
            ];
        case 'updateChatData':
            return data
        default:
            return prevState;
    }
}

export default chatData;
