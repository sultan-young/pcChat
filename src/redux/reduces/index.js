/* 
	该文件用于汇总所有的reducer为一个总的reducer
*/
//引入combineReducers，用于汇总多个reducer
import {combineReducers} from 'redux'
import login from './login'
import avatoar from './avatoar'
import userInfo from './userinfo'
import session from './session'
import linkman from './linkman'
import navalidation from './novalidation'
import chatData from './currentChatData'
import converId from './converId'
import group from './group'

export default combineReducers({
    login,
    avatoar,
    userInfo,
    session,
    linkman,
    navalidation,
    chatData,
    converId,
    group,
})