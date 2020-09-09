import React from 'react'
import { useSelector } from 'react-redux'

export const IsDev = ({children}) => {
    const dev = useSelector(state=>state.auth.authenticated && state.auth.userData?.dev)
    return (
        <>
           {dev && children}
        </>
    )
}
