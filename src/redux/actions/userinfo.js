import { message } from "antd"
import { updateUserInfo } from "../../common/server"

export const updateUserInfoAction = (userInfo)=> ({type: 'change', userInfo})
export const updateSyncUserInfo = (userInfo)=> {
        return async dispatch=> {
        const result = await updateUserInfo(userInfo)
        const { success } = result;
        if(success) {
            message.success('修改用户信息成功')
            dispatch(updateUserInfoAction(userInfo))
        }
    }
}