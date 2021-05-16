import React, { Fragment } from 'react'
import { UsergroupAddOutlined } from '@ant-design/icons';
import ChatModel from '../../../../components/Model';
import { createGroup } from '../../../../common/server';
import { SmileTwoTone, 
    HeartTwoTone,
    CheckCircleTwoTone,
    BankTwoTone,
    CarTwoTone,
    CompassTwoTone,
    CrownTwoTone,
    BulbTwoTone,
    StarTwoTone,
} from '@ant-design/icons';
import  './index.less'
import { connect } from 'react-redux';
import { updateCurrentConverId } from '../../../../redux/actions/converId';
import { message } from 'antd';


function randomIcon(converId) {
    const index = converId.slice(-1);
    switch (index) {
        case '1':
        return <SmileTwoTone/>;
        case '2':
        return <HeartTwoTone/>;
        case '3':
        return <CheckCircleTwoTone/>;
        case '4':
        return <BankTwoTone/>;
        case '5':
        return <CarTwoTone/>;
        case '6':
        return <CrownTwoTone/>;
        case '7':
        return <CompassTwoTone/>;
        case '8':
        return <BulbTwoTone/>;
        case '9':
        return <StarTwoTone/>;     
        default:
        return <SmileTwoTone/>;
    }
}

function Group(props) {
    const { contactData = [], 
        linkManList = [],
        updateCurrentConverId = ()=> {},
    } = props;
    const [isModalVisible, setIsModalVisible] = React.useState(false)
    const [mapList, setMapList] = React.useState(linkManList)

    React.useEffect(()=> {
        setMapList(mapList.map(item=> ({...item, checked:false})))
    }, [])

    function showModel() {
        setIsModalVisible(true)
    }

    function handleCancel() {
        setIsModalVisible(false)
    }

    function onTabItem(current) {
        setMapList(mapList.map(item=> {
            if(item.uid === current.uid) {
                return {
                    ...item,
                    checked: !item.checked
                }
            }
            return item
        }))
    }

    function onClickItem(item) {
        updateCurrentConverId(item.converId)
    }

    async function submit() {
        const currentUidList = mapList.filter(item=> item.checked).map(item=> item.uid)
        if(!currentUidList.length) {
            setIsModalVisible(false)
            return;
        }else if(currentUidList.length < 3){
            message.info('群聊需要至少勾选三位联系人')
            return;
        };
        await createGroup(currentUidList)
        setIsModalVisible(false)
    }

    return (
        <Fragment>
            <div onClick={showModel} className="c-lm">
                <UsergroupAddOutlined />
                <span>新建群聊</span>
            </div>
            <div className="c-group__content">
                {
                    contactData.map(item=> {
                        return (
                            <li onClick={()=> onClickItem(item)} key={item.converId} className="c-group__content-item">
                                <div className="c-group__content-item-icon">{randomIcon(item.converId)}</div>
                                <div className="c-group__content-item-des">{item.groupName}（{item.size}）</div>
                            </li>
                        )
                    })
                }
            </div>
            
            <ChatModel
                isModalVisible={isModalVisible}
                handleCancel={handleCancel}
                queryList={mapList}
                onTabItem={onTabItem}
                title='新建群聊'
                type="group"
                submit={submit}
            />
        </Fragment>
    )
}

export default connect(()=>{
    return {
        
    }
},{
    updateCurrentConverId,
})(Group)
