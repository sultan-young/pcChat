import React from 'react'
import { Popover } from 'antd';
import './index.less'
import {store} from '../../../../redux/store';
import { connect } from 'react-redux';
import Avatar from '../../../../components/baseUi/Avatar.js';

function Header(props) {
    const [popoverVisible, setPopoverVisible] = React.useState(false)
    const { option, userInfo } = props;
    function onTabPerson() {
        setPopoverVisible(!popoverVisible)
        props.onSwitchDrawer()
    }
    const menu = (
        <div className="c-header__more-menu">
          <p onClick={onTabPerson}>个人资料</p>
          <p>黑暗模式</p>
          <p onClick={onClickLogout}>注销</p>
        </div>
      );
    
    function onClickLogout() {
        setPopoverVisible(!popoverVisible)
        store.dispatch({type: 'logout'})
        localStorage.clear()
    }
    return (
        <div className="c-header">
            <div onClick={onTabPerson} className="c-header__avatar">
                <Avatar option={option} size="small"/>
            </div>
            <div className="c-header__name">
                {userInfo.nickname}
            </div>
            <Popover placement="bottomRight" content={menu}>
                <div className="c-header__more">
                    <li></li>
                    <li></li>
                    <li></li>
                </div>
            </Popover>
            
        </div>
    )
}

const mapStateToProps = (store)=> {
        return {
        login: store.login,
        option: store.avatoar,
        userInfo: store.userInfo,
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Header) 