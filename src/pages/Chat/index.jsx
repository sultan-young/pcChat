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
import { updateCurrentConverId } from '../../redux/actions/converId'
import { syncUpdateChatDataAction } from '../../redux/actions/currentChatData'
import { updateGroupAction } from '../../redux/actions/group'
import FullLoading from '../../components/baseUi/FullLoading';
import {
    ProfileOutlined,
    UserOutlined,
    TeamOutlined,
  } from '@ant-design/icons';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import Session from './components/session';
import Linkman from './components/Linkman';
import Group from './components/Group';
import { updateSyncAvatoar } from '../../redux/actions/avatoar';
import ChatPanel from './components/ChatPanel';
import { chatContext } from '../../common/context';


function Chat(props) {
    const {updateUserInfoAction,
         updateSyncAvatoar, 
         sessionList,
         validationList,
         linkManList,
         updateSessionAction,
         updateValidaAction,
         updateLinkmanAction,
         chatData,
         converId,
         syncUpdateChatDataAction,
         updateCurrentConverId,
         userInfo,
         groupList,
         updateGroupAction,
    } = props;
    
    // 搜索框的值
    const [searchValue, setSearchValue] = React.useState('')
    // 抽屉是否显示
    const [ drawerVisible, setDrawerVisible] = React.useState(false)
    // 页面loading状态
    const [ pageStatus, setPageStatus] = React.useState(false)
    // 右方显示什么 chat为聊天面板， home为个人信息
    const [ rightType, setRightType] = React.useState('chat')
    // 右侧当前的用户信息
    const [ currentUserInfo, setCurrentUserOption] = React.useState({})

    const fetchChatData = async ()=> {
        // 获取会话联系人数据 获取当前会话聊天数据
        const [contactData, chatData, userInfo ] = await Promise.all([fetchContactList(), fetchChatHistoryData(), queryUserInfo()])
        const { linkManList, sessionList, noValidation } = contactData;
        // 更新userinfo
        updateUserInfoAction(userInfo)
        // 更新当前会话列表
        updateSessionAction(sessionList)
        // 更新验证数组
        updateValidaAction(noValidation)
        // 更新联系人
        updateLinkmanAction(linkManList)
        // 更新群组信息
        const mapGroupList = chatData.filter(item=> item.type === "group")
        .map(item=> ({
            groupName:item.groupName, 
            converId: item._id, 
            size: (item.members || []).length
        }))
        updateGroupAction(mapGroupList)
        // 将当前历史记录全部存入redux
        syncUpdateChatDataAction(chatData)
        // 默认选中会话中的第一个聊天人
        if(!converId) {
            updateCurrentConverId((sessionList[0] || {}).converId)
        }
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

    const currentChatData = React.useMemo(()=> {
        return chatData.find(item=> item._id === converId) || {}
    }, [converId, chatData])

    // React.useEffect(()=> {
    //     // let currentDataObj =  chatData.find(data=> data._id === currentSeleltConvId) || {}
    //     // syncUpdateHistoryAction(currentDataObj)
    // }, [currentSeleltConvId])

    function onClickSession() {
        setRightType('chat')
    }


    const currentChatUser = React.useMemo(()=> {
        return sessionList.find(item=> item.converId === converId) || {}
    }, [sessionList, converId])
    

    // 根据输入内容过滤出否和的联系人。 过滤规则，最后聊天记录 || 姓名
    function filterList(dataList = []) {
        const result = dataList.filter(item=> {
            const { nickname = '', preview = '', groupName = '' } = item;
            return nickname.includes(searchValue) || 
            !searchValue || 
            preview.includes(searchValue) ||
            groupName.includes(searchValue)
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
                            <NavLink onClick={onClickSession} to="/chatroom/session" activeClassName="nav_active" className="c-chat-nav-item">
                                <ProfileOutlined className="c-chat-nav-item-icon"/>
                                <span>会话</span>
                            </NavLink>
                            <NavLink to="/chatroom/linkman" activeClassName="nav_active" className="c-chat-nav-item">
                               <UserOutlined className="c-chat-nav-item-icon" />
                               <span>联系人</span>
                            </NavLink>
                            <NavLink onClick={onClickSession} to="/chatroom/group" activeClassName="nav_active" className="c-chat-nav-item">
                                <TeamOutlined className="c-chat-nav-item-icon" />
                                <span>群聊</span>
                            </NavLink>
                        </div>
                        <div className="c-chat__list">
                            <chatContext.Provider  value={{setRightType, setCurrentUserOption}}>
                                <ul className="people">
                                    <Switch>
                                        <Route path="/chatroom/session" render={()=> (
                                            <Session contactData={filterList(sessionList)} />
                                        )}/>
                                        <Route path="/chatroom/linkman" render={()=> (
                                            <Linkman noValidation={validationList} linkManList={filterList(linkManList)}/>
                                        )}/>
                                        <Route path="/chatroom/group" render={()=> (
                                            <Group contactData={filterList(groupList)} linkManList={filterList(linkManList)}/>
                                        )}/>
                                        <Redirect to="/chatroom/session"/>
                                    </Switch>
                                </ul>
                            </chatContext.Provider>
                        </div>
                    </div>
                    <div className="right">
                     {
                         rightType === 'chat' ? 
                         <ChatPanel 
                         currentChatUser={currentChatUser}
                         currentChatData={currentChatData}
                         />
                         :
                         <Space userInfo={currentUserInfo} type='home'/>
                     }
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
                        <Space userInfo={userInfo} type="update" onClose={()=> onSwitchDrawer()}/>
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
        chatData: store.chatData,
        converId: store.converId,
        userInfo: store.userInfo,
        groupList: store.group,
    }
}

const mapDispatchToProps = {
    updateUserInfoAction,
    updateSessionAction,
    updateSyncAvatoar,
    updateLinkmanAction,
    updateValidaAction,
    syncUpdateChatDataAction,
    updateCurrentConverId,
    updateGroupAction,
}
export default connect(mapSteteToProps, mapDispatchToProps)(Chat)