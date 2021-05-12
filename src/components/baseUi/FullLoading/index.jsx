import React, { Fragment } from 'react'
import { Spin } from 'antd';
import './index.less'

function FullLoading(props) {
    const { children, pageStatus } = props;
    return (
        <Fragment>
            {
                pageStatus?
                children
                :
                <div className="c-fl">
                    <Spin tip="Loading..." size="large" />
                </div>
            }
        </Fragment>
    )
}

export default FullLoading
