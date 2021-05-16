import {store} from "../redux/store";
import vq from "./vq";

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
    store.dispatch({type: 'login'})
    localStorage.setItem('uid', uid)
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
    return await vq('/api/users/queryUser', {
    })
}

export async function userRegister(username, password, email) {
    const result = await vq('/api/users/register', {
        data: {username,
               password,
               email}
    })
    const { user, token, success } = result;
    if(success) {
        // 客户端存储token
        localStorage.setItem('token', token)
        localStorage.setItem('uid', user._id)
    }
    return result;
} 

export async function fetchContactList() {
    return await vq('/api/chat/contact', {

    })
}

export async function fetchChatRecordsData() {
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
