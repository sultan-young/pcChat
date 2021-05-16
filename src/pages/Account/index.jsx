import React from 'react'
import './index.css'
import LOGO from '../../assets/LOGO.png'
import   '../../common/global.js'
import { message, Input  } from 'antd';
import { userlogin, userRegister } from '../../common/server';
import { randomGenerator } from '../../common/util';
import { store } from '../../redux/store';
import { updateSyncAvatoar } from '../../redux/actions/avatoar';

export default function Account(props) {
    const [username, setUsername] = React.useState('')
    const [password, setpassword] = React.useState('')
    const [email, setemail] = React.useState('')
    const [submitType, setSubmitType] = React.useState('login')


    const info = (type, text) => {
        message[type](text);
    };
    
    async function onSubmit() { 
        if(submitType === 'login') {
            if(!username || !password) {
              info('error', '用户名密码不能为空！')
              return;
            }
            try {
                const { success } = await userlogin(username, password)
                if(success) {
                    info('success', '验证成功，正在前往VQ')            
                    props.history.push('/chatroom')
                }else {
                    info('error', '身份验证失败，请核对账号密码')
                }
            } catch (error) {
               
            }
           
       }else if(submitType === 'register') {
            if(!username || !password) {
                info('error', '用户名密码邮箱不能为空！')
                return;
            }
            const {success, message} = await userRegister(username, password, email)
            if(success) {
                // 生成一个随机的形象。
                store.dispatch(updateSyncAvatoar(randomGenerator(), false))
                info('success', '注册成功，正在前往VQ')
            }else {
                info('error', message)
            }
       }
    }

    function onChangeInputValue(type, e) {
        const value = e.target.value;
        switch (type) {
            case 'username':
                setUsername(value)
                break;
            case 'password':
                setpassword(value)
                break; 
            case 'email':
                setemail(value)
                break;
            default:
                break;
        }
    }

    function onChangeSubmitType() {
        const _submitType = submitType === 'login' ? 'register' : 'login'
        setSubmitType(_submitType)
    }

    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-t-85 p-b-20">
                    <div className="login100-form validate-form">
                        <span className="login100-form-title p-b-70">
                            欢迎使用
                        </span>
                        <span className="login100-form-avatar">
                            <img src={LOGO} alt='logo'/>
                        </span>

                        {/* 用户名 */}
                        <div className="wrap-input100 validate-input m-t-85 m-b-35" data-validate = "Enter username">
                            <Input bordered={false} className="input100" value={username} onChange={(e)=> onChangeInputValue('username', e)} type="text"/>
                            <span className="focus-input100" data-placeholder={username ? '' : '用户名'}></span>
                        </div>

                        {/* 密码 */}
                        <div className="wrap-input100 validate-input m-b-50" data-validate="Enter password">
                            <Input bordered={false} className="input100" value={password} onChange={(e)=> onChangeInputValue('password', e)} type="password"/>
                            <span className="focus-input100" data-placeholder={password ? '' : '密码'}></span>
                        </div>

                        {/* 邮箱 */}
                        {
                            submitType === 'register' ? 
                            <div className="wrap-input100 validate-input m-b-50" data-validate="Enter password">
                            <Input bordered={false} className="input100"  value={email} onChange={(e)=> onChangeInputValue('email', e)} type="email"/>
                            <span className="focus-input100" data-placeholder={email ? '' : '邮箱'}></span>
                           </div>
                           : 
                           null
                        }

                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn" onClick={onSubmit}>
                                 {submitType === 'login' ? '登录' : '注册'}   
                            </button>
                        </div>
                        <div className="login-padding"></div>
                        <ul className="login-more">
                            <li className="m-b-8">
                                <span className="txt2">
                                忘记密码
                                </span>
                            </li>

                            <li>
                                <span className="txt1">
                                   没有账号？
                                </span>

                                <span onClick={()=> onChangeSubmitType()} className="txt2">
                                    {submitType === 'login' ? '注册' : '登录'}   
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
