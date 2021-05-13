import { addChatDataAction } from "../redux/actions/currentChatData";
import { store } from "../redux/store";

let ws = null;

// 此处使用了单例模式，每次new getWebSecket 都返回同一个实例
function getWebSecket() {
    if(ws) return ws;
    ws = new WebSocket('ws://127.0.0.1:8889')

    console.log(ws);
    const SUB_UID = localStorage.getItem('uid');

    console.log(ws);

    ws.onopen = (()=> {
        ws.sendMsg({
            type: 'sub',
        })
    })

    ws.onmessage = ((msg)=> {
        const { data } = msg;
        store.dispatch(addChatDataAction(JSON.parse(data)))
    })

    ws.sendMsg = (option) =>{
        const { msg, type = 'pub', PUB_UID} = option;
        ws.send(JSON.stringify({
            SUB_UID,
            PUB_UID,
            msg,
            type,
        }))
    }
    return ws;
}

export {
    getWebSecket
}