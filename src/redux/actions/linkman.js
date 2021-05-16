export const updateLinkmanAction = (linkManList)=> ({type: 'updateLinkMan', data: linkManList})
export const deleteLinkmanAction = (username)=> ({type: 'deleteLinkMan', data: username})
export const addLinkmanAction = (linkManObj)=> ({type: 'addLinkMan', data: linkManObj})


export const updateSyncLinkman = (option, showMsg = true)=> {
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