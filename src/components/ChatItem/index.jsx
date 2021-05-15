import React from 'react'
import PropTypes from 'prop-types'
import './index.less'
import Avatar from '../baseUi/Avatar.js';
import { Button, message } from 'antd';
import { addLinkMan } from '../../common/server';
import { connect } from 'react-redux';
import { respondAddPerson } from '../../redux/actions/novalidation'
import { updateCurrentConverId } from '../../redux/actions/converId'
import moment from 'moment'
import "moment/locale/zh-cn";
moment.locale("zh-cn");

function ChatItem(props) {
    let { 
        data = {}, 
        type,
        respondAddPerson, 
        chatData, 
        isSelected, 
        updateCurrentConverId 
    } = props;
    const lastLoginTime = moment(data.lastLoginTime).startOf('hour').fromNow() + '在线'
    // moment(date, 'YYYY-MM-DD h:mm:ss').fromNow()
    async function respondAddFn(isAgree) {
        respondAddPerson(data, isAgree)
    }

    async function onClickAddLinkMan(data) {
        const { username } = data;
        const result = await addLinkMan(username)
        const { success, message : msg } = result;
        if(success) {
            message.success('发送好友验证成功')
        }else {
            message.error(msg)
        }
    }

    function onClickItem() {
        if(type === 'linkman') {
            return;
        }
        updateCurrentConverId(data.converId)
    }

    const currentChatData = React.useMemo(()=> {
        let _chatData = chatData.find(item=> item._id === data.converId) || {}
        return (_chatData.lastHistory || {}).content;
    }, [chatData, data])

    return (
        <li className={`c-item ${isSelected ? 'c-item_active' : ''}`} data-chat="person2" onClick={onClickItem}>
            {
                type === 'session' ?
                <div className="c-item__session">
                    <Avatar option={data.avatoar || {}} size='small'/>
                    <div className="c-item__session-main">
                        <span className="c-item__session-name">{data.nickname}</span>
                        <span className="c-item__session-preview">{currentChatData}</span>
                    </div>
                    <div className="c-item__session-time">{data.isOnLine ? '在线' : lastLoginTime}</div>
                </div>
                :
                null
            }
            {
                type === 'search' ?
                <div className="c-item__session">
                    <Avatar option={data.avatoar || {}} size='small'/>
                    <div className="c-item__session-main">
                        <span className="c-item__session-name">{data.nickname}</span>
                        <span className="c-item__session-preview">{data.isOnLine ? '在线' : lastLoginTime}</span>
                        </div>
                        <div className="c-item__list-add" onClick={()=> onClickAddLinkMan(data)}><span>添加</span></div>
                    </div>
                    :
                null
            }
            {
                 type === 'validation' ?
                 <div key={data.nickname} className="c-item__validation">
                      <div className="c-item__validation-icon">
                          <Avatar option={data.avatoar || {}}/>
                      </div>
                      <div className="c-item__validation-wrap">
                          <span className="c-item__session-name">{data.nickname}</span>
                          <span className="c-item__session-preview">请求添加您为好友</span>
                      </div>
                      <div className="c-item__validation-btns">
                        <Button onClick={()=> respondAddFn(true)} className="c-item__validation-btns-agree" type="primary" size='small'>同意</Button>
                        <Button onClick={()=> respondAddFn(false)} className="c-item__validation-btns-refuse" size='small'>拒绝</Button>
                      </div>
                 </div>
                 :
                 null
            }
            {
                type === 'linkman' ?
                <div className="c-item__session">
                    <Avatar option={data.avatoar || {}}/>
                    <div className="c-item__session-main">
                        <span className="c-item__session-name">{data.nickname}</span>
                        <span className="c-item__session-preview">{data.signature}</span>
                    </div>
                    {/* <div className="c-item__session-time">{data.time}</div> */}
                </div>
                :
                null
            }
        </li>
    )
}

ChatItem.propTypes = {
    type: PropTypes.string,
    data: PropTypes.object,
    isSelected: PropTypes.bool,
}

export default connect((store)=> {
    return {
        chatData: store.chatData,
        converId: store.converId,
    }
}, {
    respondAddPerson,
    updateCurrentConverId,
})(ChatItem)

