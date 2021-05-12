import React from 'react'
import Avatar from 'avataaars';
import './index.less'
import { connect } from 'react-redux';
import { randomGenerator } from '../../../../common/util';
import { updateAvatoarAction, updateSyncAvatoar} from '../../../../redux/actions/avatoar';
import {  updateUserInfoAction, updateSyncUserInfo } from '../../../../redux/actions/userinfo';
import { RedoOutlined, EditOutlined } from '@ant-design/icons';
import ChangeAvatar from '../ChangeAvatar/index'
import { Form, Input, Button, Radio, message } from 'antd';
import { store } from '../../../../redux/store';

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
    const { option, updateAvatoarAction, onClose, userInfo } = props;
    console.log(userInfo);
    const onFinish = async (values) => {
        const {email, radio: sex, username: nickname } = values;
        const obj = {
            email,
            sex,
            nickname,
        }
        if(!email) delete obj.email;
        if(!sex) delete obj.radio;
        if(!nickname) delete obj.nickname;
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
        store.dispatch(updateSyncAvatoar(randomGenerator()))
        updateAvatoarAction(optionCopy);
        onClose()
    }
    
    function back() {
        setShowAvatorOption(false)
        resetOption()
    }

    return (
        <div className="c-chat-space">
            <div className="c-chat-space__avatar">
                <Avatar
                 
                    avatarStyle={optionCopy.AvatarStyle}
                    topType= {optionCopy.Top}
                    accessoriesType= {optionCopy.Accessories}
                    hairColor= {optionCopy.HairColor}
                    facialHairType={optionCopy.FacialHair}
                    facialHairColor= {optionCopy.FacialHairColor}
                    clotheType= {optionCopy.Cloth}
                    clotheColor= {optionCopy.ClothColor}
                    eyeType= {optionCopy.Eyes}
                    eyebrowType= {optionCopy.Eyebrow}
                    mouthType= {optionCopy.Mouth}
                    skinColor= {optionCopy.Skin} 
                    graphicType={optionCopy.GraphicType}
                />
                {
                    showAvatorOption ? 
                    <Button type="link" onClick={randomGeneratorAvator} size={20} className="c-chat-space__avatar-reset">
                       随机形象
                    </Button>
                    :  
                    <Button type="link" onClick={()=> setShowAvatorOption(true)}  size={20} className="c-chat-space__avatar-edit">
                       编辑形象
                    </Button>
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
                            'username': userInfo.nickname,
                            'email': userInfo.email,
                            radio: userInfo.sex,
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
    )
}

const mapStateToProps = (store)=> {
    return {
        option: store.avatoar,
        userInfo: store.userInfo,
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

export default connect(mapStateToProps, mapDispatchToProps)(Space)

