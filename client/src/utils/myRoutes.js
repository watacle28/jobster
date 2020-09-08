import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux';

export const AuthRoute = ({component: Component, ...rest}) => {
    const isLoggedIn = useSelector((state)=>(state.auth.authenticated))
    return (
        <Route {...rest} 
        render={props => isLoggedIn ? <Redirect to="/"/> : <Component {...props}/> }
        />
    )
}



export const PrivateRoute = ({component: Component, ...rest}) => {
    const isLoggedIn = useSelector((state)=>(state.auth.authenticated))
    return (
        <Route {...rest} 
        render={props => !isLoggedIn ? <Redirect to="/login"/> : <Component {...props}/> }
        /> 
    )
}


