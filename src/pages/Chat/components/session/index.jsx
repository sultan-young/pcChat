import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import ChatItem from '../../../../components/ChatItem';

function Session(props) {
    const { contactData = [], converId } = props;
    return (
        <Fragment>
             {
                contactData.map(item=> {
                    return (
                        <div>
                          <ChatItem isSelected={converId === item.converId} key={item.username} type="session" data={item}></ChatItem>
                        </div>
                    )
                })
            }
        </Fragment>
    )
}

export default connect(store=> ({
    converId: store.converId,
}))(Session)
