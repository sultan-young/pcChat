import React, { Fragment } from 'react'

function Group(props) {
    const { contactData = [] } = props;
    return (
        <Fragment>
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
        </Fragment>
    )
}

export default Group
