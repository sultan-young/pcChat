import { respondAdd } from "../../common/server"
import { addLinkmanAction } from "./linkman"
import { addSessionAction } from "./session"

export const updateValidaAction = (validaList)=> ({type: 'updateNova', data: validaList})
export const deleteValidaAction = (username)=> ({type: 'deleteNova', data: username})
export const addValidaAction = (validaObj)=> ({type: 'addNova', data: validaObj})


export const respondAddPerson = (data, isAgree = false)=> {
    return async dispatch=> {
        const { username } = data;
        await respondAdd(username, isAgree, 123123);
        console.log(data, isAgree);
        if(isAgree) {
            dispatch(addLinkmanAction(data))
            dispatch(addSessionAction(data))
        }
        dispatch(deleteValidaAction(username));
    }
}

