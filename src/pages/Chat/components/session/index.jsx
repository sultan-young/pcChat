import React, { Fragment } from 'react'
import ChatItem from '../../../../components/ChatItem';

function Session(props) {
    const { contactData = [] } = props;
    return (
        <Fragment>
             {
                contactData.map(item=> {
                    return (
                        <ChatItem key={item.username} type="session" data={item}></ChatItem>
                    )
                })
            }
        </Fragment>
    )
}

export default Session
