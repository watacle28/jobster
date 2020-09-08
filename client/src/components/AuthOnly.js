import React from 'react'
import { useSelector } from 'react-redux'

export const AuthOnly = ({children}) => {
    const isAuth = useSelector(state=> state.auth && state.auth.authenticated)
    return (
        <>
           {isAuth && children}
        </>
    )
}
