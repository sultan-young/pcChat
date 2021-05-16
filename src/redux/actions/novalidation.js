import { respondAdd } from "../../common/server"
import { addLinkmanAction } from "./linkman"
import { addSessionAction } from "./session"
import { SmileOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { syncAppendConverAction } from "./currentChatData";

export const updateValidaAction = (validaList)=> ({type: 'updateNova', data: validaList})
export const deleteValidaAction = (username)=> ({type: 'deleteNova', data: username})
export const addValidaAction = (validaObj)=> ({type: 'addNova', data: validaObj})


export const respondAddPerson = (data, isAgree = false)=> {
    return async dispatch=> {
        const { username } = data;
        const {converId, history} =await respondAdd(username, isAgree);
        if(isAgree) {
            dispatch(addLinkmanAction({...data, converId}))
            dispatch(addSessionAction({...data, converId}))
            dispatch(syncAppendConverAction(history))
        }
        dispatch(deleteValidaAction(username));
    }
}

export const asyncAddValidaList = (data)=> {
    notification.open({
        message: '您有一条新的好友请求',
        description: <div> {`${data.nickname} ：hello，最近过得怎么样`}</div>,
        icon: <SmileOutlined style={{ color: 'green ' }} />,
      });
    return async dispatch=> {
        dispatch(addValidaAction(data))
    }
}


