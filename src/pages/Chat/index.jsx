import React from 'react'
import './index.css'
import { fetchChatHistoryData, fetchContactList,queryUserInfo } from '../../common/server';
import { Input,  Drawer } from 'antd';
import Header from './components/Header';
import Space from './components/Space/index';
import { connect } from 'react-redux';
import { updateUserInfoAction } from '../../redux/actions/userinfo'
import { updateSessionAction } from '../../redux/actions/session'
import { updateLinkmanAction } from '../../redux/actions/linkman'
import { updateValidaAction } from '../../redux/actions/novalidation'
import FullLoading from '../../components/baseUi/FullLoading';
import {
    ProfileOutlined,
    UserOutlined,
    TeamOutlined,
  } from '@ant-design/icons';
import { NavLink, Route, Switch } from 'react-router-dom';
import Session from './components/session';
import Linkman from './components/Linkman';
import Group from './components/Group';
import { updateSyncAvatoar } from '../../redux/actions/avatoar';

function Chat(props) {
    const {updateUserInfoAction,
         updateSyncAvatoar, 
         sessionList,
         validationList,
         linkManList,
         updateSessionAction,
         updateValidaAction,
         updateLinkmanAction,
    } = props;
    // 当前会话id
    const [currentSeleltConvId, setCurrentSeleltConvId] = React.useState([])
    // 当前会话聊天数据
    const [chatData, setChatData] = React.useState({})
    // 搜索框的值
    const [searchValue, setSearchValue] = React.useState('')
    // 抽屉是否显示
    const [ drawerVisible, setDrawerVisible] = React.useState(false)
    // 页面loading状态
    const [ pageStatus, setPageStatus] = React.useState(false)
    // 当前选中的组
    const [ selectType, setSelectType ] = React.useState('session');
    
    const fetchChatData = async ()=> {
        // 获取会话联系人数据 获取当前会话聊天数据
        const [contactData, chatData, userInfo ] = await Promise.all([fetchContactList(), fetchChatHistoryData(), queryUserInfo()])

        const { linkManList, sessionList, noValidation, groupList = []} = contactData;
        updateSessionAction(sessionList)
        updateValidaAction(noValidation)
        updateLinkmanAction(linkManList)
        setChatData(chatData)
        // 更新userinfo
        updateUserInfoAction(userInfo)
        updateSyncAvatoar(userInfo.avatoar, false)
        // 将页面变为正常状态
        const timer = setTimeout(() => {
         setPageStatus(true)
         clearTimeout(timer)
        }, 500);
    }

    React.useEffect(()=> {
        fetchChatData()
    }, [])
    

    // 更具输入内容过滤出否和的联系人。 过滤规则，最后聊天记录 || 姓名
    function filterList(dataList) {
        const result = dataList.filter(item=> {
            const { nickname, preview } = item;
            return nickname.includes(searchValue) || !searchValue || (preview || '').includes(searchValue)
        });
        return result;
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
                        <Header onSwitchDrawer={onSwitchDrawer}/>
                        <div className="top">
                            <Input type="text" onChange={(e)=> setSearchValue(e.target.value)} value={searchValue} onPressEnter={()=> {}} placeholder="联系人" />
                        </div>
                        <div className="c-chat-nav">
                            <NavLink to="/chatroom/session" activeClassName="nav_active" className="c-chat-nav-item">
                                <ProfileOutlined className="c-chat-nav-item-icon"/>
                                <span>会话</span>
                            </NavLink>
                            <NavLink to="/chatroom/linkman" activeClassName="nav_active" className="c-chat-nav-item">
                               <UserOutlined className="c-chat-nav-item-icon" />
                               <span>联系人</span>
                            </NavLink>
                            <NavLink to="/chatroom/group" activeClassName="nav_active" className="c-chat-nav-item">
                                <TeamOutlined className="c-chat-nav-item-icon" />
                                <span>群组</span>
                            </NavLink>
                        </div>
                        <div className="c-chat__list">
                            <ul className="people">
                               <Switch>
                                        <Route exact path="/chatroom/session" render={()=> (
                                            <Session contactData={filterList(sessionList)} />
                                        )}/>
                                        <Route path="/chatroom/linkman" render={()=> (
                                            <Linkman noValidation={validationList} linkManList={filterList(linkManList)}/>
                                        )}/>
                                        <Route path="/chatroom/group" render={()=> (
                                            <Group contactData={filterList([])}/>
                                        )}/>
                                </Switch>
                            </ul>
                        </div>
                    </div>
                    <div className="right">
                        <div className="top"><span>To: <span className="name">Dog Woofson</span></span></div>
                        <div className="c-chat__content">
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
                        </div>
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

const mapSteteToProps = (store)=> {
    return {
        sessionList: store.session,
        linkManList: store.linkman,
        validationList: store.navalidation,
    }
}

const mapDispatchToProps = {
    updateUserInfoAction,
    updateSessionAction,
    updateSyncAvatoar,
    updateLinkmanAction,
    updateValidaAction,
}
export default connect(mapSteteToProps, mapDispatchToProps)(Chat)