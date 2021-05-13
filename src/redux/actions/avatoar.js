import { message } from "antd"
import { updateAvatoar } from "../../common/server"

export const updateAvatoarAction = (option)=> ({type: 'changeAvatoar', option})
export const updateSyncAvatoar = (option, showMsg = true)=> {
    return async dispatch=> {
        const result = await updateAvatoar(option)
        const { success } = result;
        if(success) {
            dispatch(updateAvatoarAction(option))
            if(!showMsg) return;
            message.success('修改头像成功')
        }
    }
}