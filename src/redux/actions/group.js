import { message } from "antd"
import { updateAvatoar } from "../../common/server"

export const updateGroupAction = (groupList)=> ({type: 'updateGroup', data: groupList})
export const deleteGroupAction = (converId)=> ({type: 'deleteGroup', data: converId})
export const addGroupAction = (groupObj)=> ({type: 'addGroup', data: groupObj})


export const updateSyncGroup = (option, showMsg = true)=> {
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