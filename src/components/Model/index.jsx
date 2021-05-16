import { Modal, Input } from 'antd'
import React from 'react'
import ChatItem from '../ChatItem';

const { Search } = Input;


function ChatModel(props) {
    const { 
        isModalVisible,
        handleCancel,
        queryList = [],
        onSearch = ()=> {},
        title,
        type,
        onTabItem,
        submit = ()=> {},
    } = props;
    const [inputValue, setInputValue] = React.useState('')

    const memoList = React.useMemo(()=> {
        return queryList.filter(item=> (item.nickname || '').includes(inputValue))
    }, [inputValue, queryList])
    
   function onChange(e) {
        setInputValue(e.target.value)
   }

    return (
        <Modal 
                visible={isModalVisible} 
                onCancel={handleCancel}
                onOk={submit}
                keyboard={true}
                title= {title}
                wrapClassName="c-lm__model"
                cancelText='取消'
                okText='完成' 
                closable={false}
            >
                <div className="c-lm__model-search">
                    {
                        type === 'search' ?
                        <Search
                        placeholder="查找联系人"
                        allowClear
                        enterButton="查找"
                        size="large"
                        onSearch={(value)=> onSearch(value)}
                        />
                        :
                        <Input placeholder="搜索" value={inputValue} onChange={(e)=> onChange(e)}/>
                    }
                    
                </div>
                <div className="c-lm__model-linkman">
                    {
                        memoList.map(item=> (
                            <div key={item.username} onClick={()=> onTabItem && onTabItem(item)}>
                                <ChatItem key={item.username} type={type} data={item}/>
                            </div>
                        ))
                    }
                </div>
            </Modal>
    )
}

export default ChatModel
