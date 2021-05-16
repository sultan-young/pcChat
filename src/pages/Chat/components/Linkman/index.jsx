import React, { Fragment, useContext } from 'react'
import { UserAddOutlined } from '@ant-design/icons';
import './index.less'
import { message } from 'antd';
import {  queryLinkMan } from '../../../../common/server';
import ChatItem from '../../../../components/ChatItem';
import { chatContext } from '../../../../common/context';
import ChatModel from '../../../../components/Model';

function Linkman(props) {
    const { linkManList = [], noValidation = [] } = props;
    const [isModalVisible, setIsModalVisible] = React.useState(false)
    const [_linkManData, setLinkManData] = React.useState([])
    const [queryList, setQueryList] = React.useState([])
    // 获取Space组件传过来的显示用户面板context
    const chatContextValue = useContext(chatContext)
    const {setRightType, setCurrentUserOption} = chatContextValue

    React.useEffect(()=> {
      setLinkManData(linkManList.map(item=> ({...item, isSelected: false})))
    }, [linkManList])
    
    function showModel() {
        setIsModalVisible(true)
    }

    function handleCancel() {
        setIsModalVisible(false)
    }

    function onClickItem(_index) {
        const mapLinkManList = linkManList.map((item, index)=> {
            return {
                ...item,
                isSelected: index === _index,
            }
        })
        setRightType('home')
        setLinkManData(mapLinkManList)
        setCurrentUserOption(linkManList[_index])
    }


    async function onSearch(searchValue) {
        if(!searchValue) return;
        const queryList = await queryLinkMan(searchValue)
        setQueryList(queryList)
        if(!queryList.length) {
            message.success('未找到否和的用户')
        }
        const ref = document.getElementsByClassName('ant-modal-body')[0]
        ref.style.maxHeight = '400px'
    }

     return (
        <Fragment>
            <div onClick={showModel} className="c-lm">
                <UserAddOutlined />
                <span>添加联系人</span>
            </div>
            {/* // 好友验证 */}
            {
            (noValidation || []).map(item=> {
                return <ChatItem type='validation' key={item.username} data={item}></ChatItem>
            })
            }
            {
            _linkManData.map((item, index)=> { 
                return (
                    <div key={item.username} onClick={()=> onClickItem(index)}>
                        <ChatItem isSelected={item.isSelected} key={item.username} type="linkman" data={item}></ChatItem>
                    </div>
                )
            })
            }
            <ChatModel
                isModalVisible={isModalVisible}
                handleCancel={handleCancel}
                queryList={queryList}
                onSearch={onSearch}
                title='添加新的联系人'
                type="search"
            />
        </Fragment>
    )
}

export default Linkman