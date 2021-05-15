import React, { Fragment } from 'react'
import './index.less'
import { connect } from 'react-redux';
import { randomGenerator } from '../../../../common/util';
import { updateAvatoarAction, updateSyncAvatoar} from '../../../../redux/actions/avatoar';
import {  updateUserInfoAction, updateSyncUserInfo } from '../../../../redux/actions/userinfo';
import ChangeAvatar from '../ChangeAvatar/index'
import { Form, Input, Button, Radio, message } from 'antd';
import { store } from '../../../../redux/store';
import PropTypes from 'prop-types'
import Home from '../../../../components/Home';
import Avatar from '../../../../components/baseUi/Avatar.js';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};



function Space(props) {
    const { updateAvatoarAction, onClose, userInfo, type = 'home' } = props;
    const { avatoar: option } = userInfo;
    
    const onFinish = async (values) => {
        const {email, radio: sex, username: nickname, signature } = values;
        const obj = {
            email,
            sex,
            nickname,
            signature,
        }
        if(!email) delete obj.email;
        if(!sex) delete obj.radio;
        if(!nickname) delete obj.nickname;
        if(!signature) delete obj.signature;
        store.dispatch(updateSyncUserInfo(obj))
        onClose()
      };
      const onFinishFailed = (errorInfo) => {
        message.error('填写资料错误')
      };

    const [optionCopy, setOptionCopy] = React.useState(option || {});
    // 是否显示修改头像组件
    const [ showAvatorOption, setShowAvatorOption] = React.useState(false);

    function randomGeneratorAvator() {
        if(!showAvatorOption) {
            setShowAvatorOption(!showAvatorOption)
            return
        };
        setOptionCopy(randomGenerator())
    }

    function changeAvatarFn(key, value) {
        updateAvatoarAction({
            ...option,
            [key]: value,
        })
    }

    function changeOptionFn(key, value) {
        setOptionCopy({
            ...optionCopy,
            [key]: value,
        })
    }

    function resetOption() {
        setOptionCopy(option)
    }

    function submitOption() {
        store.dispatch(updateSyncAvatoar(optionCopy))
        updateAvatoarAction(optionCopy);
        onClose()
    }
    
    function back() {
        setShowAvatorOption(false)
        resetOption()
    }

    return (
        <Fragment>
           {
               type === 'update' ?
               <div className="c-chat-space">
                  <div className="c-chat-space__avatar">
                        <Avatar option={optionCopy || {}} size="large"/>
                        {
                            type === 'update' ? 
                            showAvatorOption ? 
                            <Button type="link" onClick={randomGeneratorAvator} size={20} className="c-chat-space__avatar-reset">
                            随机形象
                            </Button>
                            :  
                            <Button type="link" onClick={()=> setShowAvatorOption(true)}  size={20} className="c-chat-space__avatar-edit">
                            编辑形象
                            </Button>
                            :
                            null
                        }
                    </div>
                  <div className="c-chat-space__ca">
                    {
                        showAvatorOption ?
                        <ChangeAvatar 
                        optionCopy={optionCopy}
                        resetOption={resetOption} 
                        submitOption={submitOption} 
                        changeOptionFn={changeOptionFn}
                        backFn={back} />
                        :
                        <div className="c-chat-space__form">
                            <Form
                            {...layout}
                            name="basic"
                            initialValues={{
                                 username: userInfo.nickname,
                                 email: userInfo.email,
                                 radio: userInfo.sex,
                                 signature: userInfo.signature,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            >
                            <Form.Item
                                label="昵称"
                                name="username"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="邮箱"
                                name="email"
                                rules={[{ type: 'email',message: '不是有效邮箱' }]}
                                >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="个性签名"
                                name="signature"
                                >
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item name="radio" label="性别">
                                <Radio.Group>
                                    <Radio value="1">男</Radio>
                                    <Radio value="2">女</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    提交修改
                                </Button>
                            </Form.Item>
                            </Form>
                    
                        </div>
                        }
                    </div>
               </div>
               :
               <Home userInfo={userInfo} option={option || {}}/>
                 }
        </Fragment>
    )
}

const mapStateToProps = (store)=> {
    return {
    }
}

const mapDispatchToProps = {
    updateAvatoarAction,
    updateSyncAvatoar,
    updateUserInfoAction,
    updateSyncUserInfo,
}

// const mapDispatchToProps = (dispatch)=> {
//     return {
//         changeAvatar: (option)=> {
//             dispatch(updateAvatoarAction(option))
//         }
//     }
// }

Space.propTypes = {
    type: PropTypes.string,
    onClose: PropTypes.func,
    userInfo: PropTypes.object,
}


export default connect(mapStateToProps, mapDispatchToProps)(Space)

