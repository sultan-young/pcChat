export const updateSessionAction = (sessionList)=> ({type: 'updateSession', data: sessionList})
export const deleteSessionAction = (username)=> ({type: 'deleteSession', data: username})
export const addSessionAction = (sessionObj)=> ({type: 'addSession', data: sessionObj})


export const updateSyncSession = (option, showMsg = true)=> {
    return async dispatch=> {
        // const result = await updateSession(option)
        // const { success } = result;
        // if(success) {
        //     dispatch(updateSessionAction(option))
        //     if(!showMsg) return;
        //     message.success('修改头像成功')
        // }
    }
}