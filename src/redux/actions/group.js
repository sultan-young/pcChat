export const updateGroupAction = (groupList)=> ({type: 'updateGroup', data: groupList})
export const deleteGroupAction = (converId)=> ({type: 'deleteGroup', data: converId})
export const addGroupAction = (groupObj)=> ({type: 'addGroup', data: groupObj})


export const updateSyncGroup = (option, showMsg = true)=> {
    return async dispatch=> {
    }
}