import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute (props) {
    const { path, component, login } = props;
    return (
        <Fragment>
            {
                login ? 
                <Fragment>
                    <Route path={path} component={component}/>
                </Fragment>
                : 
                <Redirect to='/account'/>
            }
        </Fragment>
    )
}

export default connect((store)=> ({
    login: store.login,
}))(PrivateRoute)
