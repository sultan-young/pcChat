import React from 'react'
import Avatar from '../baseUi/Avatar.js'
import './index.less'
import moment from 'moment'
import "moment/locale/zh-cn";
moment.locale("zh-cn");

function Home(props) {
    const { option, userInfo } = props;
    const lastLoginTime = moment(userInfo.lastLoginTime).startOf('hour').fromNow();

    return (
        <div className="c-home">
            <div className="c-home__header">好友资料</div>
            <div className="c-home__body">
                <div className="c-home__body-avatar">
                    <Avatar option={option} size="large"></Avatar>
                </div>
                <div className="c-home__body-content">
                    <label className="c-home__body-content-wrap">
                        <div className="c-home__body-content-key">呢称：</div>
                        <div className="c-home__body-content-value">{userInfo.nickname}</div>
                    </label>
                    <label className="c-home__body-content-wrap">
                        <div className="c-home__body-content-key">邮箱：</div>
                        <div className="c-home__body-content-value">{userInfo.email}</div>
                    </label>
                    <label className="c-home__body-content-wrap">
                        <div className="c-home__body-content-key">性别：</div>
                        <div className="c-home__body-content-value">{userInfo.sex === 1? '男' : '女'}</div>
                    </label>
                    <label className="c-home__body-content-wrap">
                        <div className="c-home__body-content-key">签名：</div>
                        <div className="c-home__body-content-value">{userInfo.signature || '该用户很懒，还没有填写个性签名'}</div>
                    </label>
                    <label className="c-home__body-content-wrap">
                        <div className="c-home__body-content-key">{userInfo.isOnLine ? '当前状态：': '上次登陆：'}</div>
                        <div className="c-home__body-content-value">{userInfo.isOnLine ? '在线' : lastLoginTime}</div>
                    </label>
                </div>
            </div>
        </div> 
    )
}

export default Home
