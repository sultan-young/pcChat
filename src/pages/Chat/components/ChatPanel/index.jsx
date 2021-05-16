import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import { getWebSecket } from '../../../../common/websocket';
import { syncUpdateHistoryAction } from '../../../../redux/actions/currentChatData';
import { Input } from 'antd';
import moment from 'moment'
import "moment/locale/zh-cn";
import './index.less'
import { DownCircleTwoTone } from '@ant-design/icons';

moment.locale("zh-cn");

function autoScroll(ref) {
    const dom = ref.current;
    if(!dom) return ()=>{};
    return ()=> {
        dom.scrollTop = dom.scrollHeight - dom.clientHeight;
    }
}


function ChatPanel(props) {
    const { 
        currentChatData, 
        converId,
        syncUpdateHistoryAction,
        currentChatUser,
        nickName,
     } = props;

     const ws = new getWebSecket();

    // chat面板时间
    const lastLoginTime = moment((currentChatData.lastHistory || {}).date).calendar(); 

    // 聊天框的值
    const [chatValue, setChatValue] = React.useState('')
    // chat面板ref
    const chatRef = React.useRef()
    // 是否显示快读到底按钮
    const [ isShowDown, setIsShowDown ] = React.useState()

    React.useEffect(()=> {
        autoScroll(chatRef)()
    }, [currentChatData, converId])

    React.useEffect(()=> {
        const chatDom = chatRef.current;
        chatDom.onscroll = ()=> {
            setIsShowDown(!(chatDom.scrollTop >= chatDom.scrollHeight - 2 * chatDom.clientHeight))
        }
    }, [])
    
    function sendMessage() {
        if(!chatValue) return;
        const { type } = currentChatData;
        const UID = localStorage.getItem('uid');

        if(type === 'group') {
            ws.sendGroup({
                msg: chatValue,
                SUB_UID: UID,
                converId, 
                members: currentChatData.members,
                type: 'text',
                talkerName: nickName,
            })
        }else {
            ws.sendMsg({
                msg: chatValue,
                PUB_UID: currentChatUser.uid, 
                SUB_UID: UID,
                converId, 
                type: 'text'
            })
        }
        syncUpdateHistoryAction({
            date: new Date().getTime(),
            talker: UID,
            converId,
            content: chatValue,
            read: [],
            type:'text',
        })
        setChatValue('')
        setTimeout(()=> {
            autoScroll(chatRef)()
        })
    }

    return (
        <Fragment>
            <div className="top">
                {
                    currentChatData.type === "group" ? 
                    <span>{currentChatData.groupName}</span>
                    :
                    <span>与{currentChatUser.nickname}交谈中</span>
                }
            </div>
            <div className="c-chat__content">
                {
                    isShowDown ?
                    <div onClick={autoScroll(chatRef)} className="c-cp__down">
                    <DownCircleTwoTone />
                    </div>
                    :
                    null
                }
                
                <div ref={chatRef} className="chat active-chat" data-chat="person2">
                    <div className="conversation-start">
                        <span>{lastLoginTime}</span>
                    </div>
                    {
                   (currentChatData.history || []).map(item=> {
                        return(
                            <div key={item.date} className={`c-cp__wrap bubble ${item.isMySelf ? 'c-cp__wrap_me' : 'c-cp__wrap_you'}`}>
                                {
                                    currentChatData.type === 'group' && !item.isMySelf?
                                    <div className="c-cp__name">{item.talkerName || '匿名用户'}</div>
                                    :
                                    null
                                }
                                <div className={`c-cp__item_chat ${item.isMySelf ? 'c-cp__item_me' : 'c-cp__item_you'}`}>{item.content}</div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            <div className="write-wrap">
                <div className="write">
                    <div className="write-link attach"></div>
                    <Input
                    onChange={(e)=> setChatValue(e.target.value)}
                    value={chatValue}
                    onPressEnter={sendMessage}/>
                    <div className="write-link smiley"></div>
                    <div onClick={sendMessage} className="write-link send"></div>
                </div>
            </div>
        </Fragment>
    )
}

export default connect(store=> ({
    converId: store.converId,
    nickName: store.userInfo.nickname,
}), {
    syncUpdateHistoryAction,
})(ChatPanel)
