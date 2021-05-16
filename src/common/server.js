import { message } from "antd";
import { updateSyncAvatoar } from "../redux/actions/avatoar";
import {store} from "../redux/store";
import { randomGenerator } from "./util";
import vq from "./vq";

// 设置用户是否在线
export async function setUserIsOnLine(isOnLine) {
    return await vq('/api/users/setUserOnline', {
        data: {
            isOnLine,
        }
    })
}


export async function userlogin(username, password) {
    const result = await vq('/api/users/login', {
        data: {
          username,
          password,
        }
    })
    const { uid, token } =  result;
    // 客户端存储token
    localStorage.setItem('token', token)
    localStorage.setItem('uid', uid)
    store.dispatch({type: 'login'})
    return result;
}


// 修改头像
export async function updateAvatoar(avatoar) {
    return await vq('/api/users/avatoar', {
        data: {
            avatoar,
        }
    })
}

// 修改用户信息
export async function updateUserInfo(info) {
    return await vq('/api/users/userinfo', {
        data: {
            ...info,
        }
    })
}

// 修改用户信息
export async function queryUserInfo() {
     const result = await vq('/api/users/queryUser', {
    })
    localStorage.setItem('uid', result.uid);
    return result;
}

export async function userRegister(username, password, email) {
    const randomAvatar = randomGenerator();
    const result = await vq('/api/users/register', {
        data: {username,
               password,
               email,
               randomAvatar,
            }
    })
    const { user, token, success } = result;
    if(success) {
        // 客户端存储token
        localStorage.setItem('token', token)
        localStorage.setItem('uid', user._id)
        // 生成一个随机的形象。
        store.dispatch(updateSyncAvatoar(randomAvatar, false))
    }
    return result;
} 

export async function fetchContactList() {
    return await vq('/api/chat/contact', {

    })
}

export async function fetchChatHistoryData() {
    return await vq('/api/chat/chatData', {

    })
}

// 搜索对应联系人
export async function queryLinkMan(username) {
    return await vq('/api/chat/queryLinkman', {
        data: {
            username,
        }
    })
}

// 添加联系人
export async function addLinkMan(username) {
    return await vq('/api/chat/addLinkman', {
        data: {
            username,
        }
    })
}


// 拉群聊
export async function createGroup(usersList) {
    return await vq('/api/chat/createGroup', {
        data: {
            usersList,
            nickname: store.getState().userInfo.nickname,
        }
    })
}


/**
 * 
 * @param {Boolean} isAgree 
 * @param {String} username 
 * @returns 
 */
// 添加联系人
export async function respondAdd(username, isAgree) {
    const {success,code, message: msg, converId, history} =  await vq('/api/users/respondAdd', {
        data: {
            isAgree,
            username,
        }
    })
    if(code === 'success') {
        message.success(msg)
    }else {
        message.error(msg)
    }
    return {
        converId,
        history,
    };
}
