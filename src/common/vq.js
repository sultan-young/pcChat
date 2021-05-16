import axios from 'axios';
import { message } from 'antd';

const vq  = axios.create({
    method: 'post',
    timeout: 3000,
    baseURL : process.env.NODE_ENV === 'production' ? 'http://localhost:7777' : 'http://localhost:3000'
})

// http request 拦截器 
vq.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        const uid = localStorage.getItem('uid')
        console.log(process.env.NODE_ENV);
        if(process.env.NODE_ENV === 'production') {
            config.url = config.url.replace(/\/api/,''); 
        }
        if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.authorization = token  //请求头加上token
        }
        if(uid) {
            config.headers.uid = uid  //请求头每次带上uid
        }
        return config
    },
    err => {return Promise.reject(err)}
 )


// http response 拦截器
vq.interceptors.response.use(
    response => {
    //拦截响应，做统一处理 
    if (!response.data.success) {
       
    }
    return response.data;
},
    //接口错误状态处理，也就是说无响应时的处理 
    error => {
      const errorCode = (error.response || {}).status || 404
      if(errorCode === 401) { 
        message.error('登陆状态失效，请重新登陆', 1, ()=>{
            window.location.pathname = '/account'
        })
      }else{
        message.error('网络不好，请联系管理员！')
      }
      return Promise.reject(errorCode) // 返回接口返回的错误信息
})


export default vq;