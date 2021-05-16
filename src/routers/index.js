import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Account from '../pages/Account'
import Chat from '../pages/Chat'
import PrivateRoute from './PrivateRoute '

export default class RouterPage extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/account' component={Account}/>
                    {/* 当PrivateRoute组件被switch包裹的时候，只有路径匹配对了之后，才会执行组件内代码，
                        当没有被switch包裹时候组件内代码在路径不匹配时候也会执行。
                        姑且当做Switch组件的特性 
                    */}
                    <PrivateRoute path='/chatroom' component={Chat}/>
                    <Redirect to='/account'/>
                </Switch>
            </BrowserRouter>
        )
    }
}
