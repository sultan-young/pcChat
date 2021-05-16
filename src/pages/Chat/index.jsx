import React from 'react'
import './index.css'
import { fetchChatRecordsData, fetchContactList,queryUserInfo, queryLinkMan, addLinkMan } from '../../common/server';
import { Input, message, Drawer } from 'antd';
import moment from 'moment'
import "moment/locale/zh-cn";
import Header from './components/Header';
import Space from './components/Space/index';
import { connect } from 'react-redux';
import { updateUserInfoAction } from '../../redux/actions/userinfo'
import { store } from '../../redux/store';
import { SearchOutlined } from '@ant-design/icons';
import FullLoading from '../../components/baseUi/FullLoading';

moment.locale("zh-cn");
const data = {
        
}

function Chat(props) {
    // 当前会话id
    const [currentSeleltConvId, setCurrentSeleltConvId] = React.useState([])
    // 当前会话联系人数据
    const [contactData, setContactData] = React.useState([])
    // 当前会话聊天数据
    const [chatData, setChatData] = React.useState({})
    // 搜索框的值
    const [searchValue, setSearchValue] = React.useState('')
    // 抽屉是否显示
    const [ drawerVisible, setDrawerVisible] = React.useState(false)
    // 页面loading状态
    const [ pageStatus, setPageStatus] = React.useState(false)

    const fetchChatData = async ()=> {
        // 获取会话联系人数据 获取当前会话聊天数据
        const [contactData, chatData, userInfo ] = await Promise.all([fetchContactList(), fetchChatRecordsData(), queryUserInfo()])
        data.contactData = contactData;
        setCurrentSeleltConvId(contactData[0].converId)
        setContactData(contactData)
        setChatData(chatData)
        // 更新userinfo
        store.dispatch(updateUserInfoAction(userInfo))
        // 将页面变为正常状态
        const timer = setTimeout(() => {
         setPageStatus(true)
         clearTimeout(timer)
        }, 500);
    }

    React.useEffect(()=> {
        fetchChatData()
    }, [])
    
    async function serachLinkMan() {
        if(!searchValue) return;
        const linkManList = await queryLinkMan(searchValue)
        if(!linkManList.length) {
            message.success('未找到否和的用户')
            setSearchValue('')
            setContactData(data.contactData)
        }
        const _linkManList = linkManList.map(item=> {
            let date = moment(item.lastLoginTime).format('YYYY-MM-DD h:mm:ss');
            let lastTime = moment(date, 'YYYY-MM-DD h:mm:ss').fromNow()
            return {
                ...item,
                preview: item.isOnLine ? '在线' : `上次在线：${lastTime}`,
                time: <div className="c-chat-add" onClick={()=> onClickAddLinkMan(item)}>添加</div>,
                name: item.username,
            }
        })
        console.log(_linkManList, data);
        setContactData(_linkManList)
    }

    // 更具输入内容过滤出否和的联系人。 过滤规则，最后聊天记录 || 姓名
    function filterLinkMan(e) {
        const serchValue = e.target.value;
        setSearchValue(serchValue)
        const { contactData } = data;
        const result = contactData.filter(item=> {
            const { name, preview } = item;
            return name.includes(serchValue) || !serchValue || preview.includes(serchValue)
        });
        setContactData(result)
    }

    async function onClickAddLinkMan(item) {
        const { username } = item;
        const result = await addLinkMan(username)
        const { success, message : msg } = result;
        if(success) {
            message.success('发送好友验证成功')
        }else {
            message.error(msg)
        }
    }
    
    function onSwitchDrawer() {
        setDrawerVisible(!drawerVisible)
    }

    return (
        <FullLoading pageStatus={pageStatus}>
            <div className="c-chat-bg"></div>
            <div className="wrapper">
                <div className="container">
                    <div className="left">
                        <Header {...props} onSwitchDrawer={onSwitchDrawer}/>
                        <div className="top">
                            <Input type="text" onChange={(e)=> filterLinkMan(e)} value={searchValue} onPressEnter={()=> serachLinkMan()} placeholder="联系人" />
                            <div onClick={()=> serachLinkMan()} className="search">
                                 <SearchOutlined />
                            </div>
                        </div>
                        <ul className="people">
                            {
                                contactData.map(item=> {
                                    return (
                                        <li key={item.name} className="person" data-chat="person2">
                                            <img src="img/dog.png" alt="" />
                                            <div className="name-wrap">
                                                <span className="name">{item.name}</span>
                                                <span className="preview">{item.preview}</span>
                                            </div>
                                            <div className="time">{item.time}</div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="right">
                        <div className="top"><span>To: <span className="name">Dog Woofson</span></span></div>
                        {
                            chatData[currentSeleltConvId] ? 
                            <div className="chat active-chat" data-chat="person2">
                                <div className="conversation-start">
                                    <span>{chatData[currentSeleltConvId].lastTime}</span>
                                </div>
                                {
                                    (chatData[currentSeleltConvId].data || []).map(item=> {
                                        return(
                                            <div key={item.timestamp} className={`bubble ${item.isMySelf ? 'me' : 'you'}`}>
                                                {item.content}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            : 
                            <div>暂无消息</div>
                        }
                        <div className="write-wrap">
                            <div className="write">
                                <div className="write-link attach"></div>
                                <input type="text" />
                                <div className="write-link smiley"></div>
                                <div className="write-link send"></div>
                            </div>
                        </div>
                    </div>
                    <Drawer 
                        className="c-chat-drawer"
                        title="个人资料"
                        placement="right"
                        closable={true}
                        onClose={()=> onSwitchDrawer()}
                        visible={drawerVisible}
                        getContainer={false}
                        style={{ position: 'absolute' }}
                        >
                        <Space onClose={()=> onSwitchDrawer()}/>
                    </Drawer>
                </div>
            </div>
        </FullLoading>
    )
}

export default connect(()=> {
    return {

    }
},{
    updateUserInfoAction,
})(Chat)