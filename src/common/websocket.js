import { syncAppendConverAction, syncUpdateHistoryAction } from "../redux/actions/currentChatData";
import { addLinkmanAction } from "../redux/actions/linkman";
import { asyncAddValidaList } from "../redux/actions/novalidation";
import { addSessionAction } from "../redux/actions/session";
import { store } from "../redux/store";

let ws = null;

// 此处使用了单例模式，每次new getWebSecket 都返回同一个实例
function getWebSecket() {
    if(ws) return ws;
    ws = new WebSocket('ws://127.0.0.1:7779')

    const SUB_UID = localStorage.getItem('uid');

    ws.onopen = (()=> {
        ws.sendMsg({
            type: 'sub',
        })
    })

    ws.onclose = ()=> {
        console.log('客户端离线了');
    }

    ws.onmessage = ((msg)=> {
        const { data: wsData } = msg;
        const parseData = JSON.parse(wsData);
        const {type, data} = parseData;
        if(type === 'session') {
            store.dispatch(syncUpdateHistoryAction(data))
        }else if(type === 'linkmanRequest') {
            store.dispatch(asyncAddValidaList(data))
        } else if(type === 'linkmanResponse') {
            const {userinfo, history, converId} = data;
            store.dispatch(addLinkmanAction({...userinfo, converId}))
            store.dispatch(addSessionAction({...userinfo, converId}))
            store.dispatch(syncAppendConverAction(history))
        }
       
    })

    ws.sendMsg = (option) =>{
        const { msg, type = 'pub', PUB_UID, converId } = option;
        ws.send(JSON.stringify({
            SUB_UID,
            PUB_UID,
            msg,
            type,
            converId,
        }))
    }

    ws.sendGroup = (option)=> {
        const { msg, type = 'pub', converId, members, talkerName } = option;
        ws.send(JSON.stringify({
            SUB_UID,
            PUB_UID: members,
            msg,
            type,
            converId,
            talkerName,
        }))
        console.log(option);
    }

    return ws;
}

export {
    getWebSecket
}