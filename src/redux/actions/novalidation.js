import { message } from "antd"
import { updateAvatoar } from "../../common/server"

export const updateValidaAction = (validaList)=> ({type: 'updateNova', data: validaList})
export const deleteValidaAction = (username)=> ({type: 'deleteNova', data: username})
export const addValidaAction = (validaObj)=> ({type: 'addNova', data: validaObj})


export const updateSyncValida = (option, showMsg = true)=> {
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