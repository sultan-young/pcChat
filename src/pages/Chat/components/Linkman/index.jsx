import React, { Fragment } from 'react'
import { UserAddOutlined } from '@ant-design/icons';
import './index.less'
import { Modal, Input, message } from 'antd';
import { addLinkMan, queryLinkMan } from '../../../../common/server';
import ChatItem from '../../../../components/ChatItem';

const { Search } = Input;

function Linkman(props) {
    const { linkManList = [], noValidation = [] } = props;
    const [isModalVisible, setIsModalVisible] = React.useState(false)
    const [linkManData, setLinkManData] = React.useState([])

    function showModel() {
        setIsModalVisible(true)
    }

    function handleCancel() {
        setIsModalVisible(false)
    }


    async function onSearch(searchValue) {
        if(!searchValue) return;
        const linkManList = await queryLinkMan(searchValue)
          console.log(linkManList, 123132);
        setLinkManData(linkManList)
        if(!linkManList.length) {
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
                linkManList.map(item=> {
                    return (
                        <ChatItem key={item.username} type="linkman" data={item}></ChatItem>
                    )
                })
            }
            <Modal title="Basic Modal" 
                visible={isModalVisible} 
                onCancel={handleCancel}
                keyboard={true}
                title='添加新的联系人'
                wrapClassName="c-lm__model"
            >
                <div className="c-lm__model-search">
                    <Search
                    placeholder="查找联系人"
                    allowClear
                    enterButton="查找"
                    size="large"
                    onSearch={(value)=> onSearch(value)}
                    />
                </div>
                <div className="c-lm__model-linkman">
                    {
                        linkManData.map(item=> (
                            <ChatItem key={item.username} type="search" data={item}/>
                        ))
                    }
                </div>
            </Modal>
        </Fragment>
    )
}

export default Linkman
