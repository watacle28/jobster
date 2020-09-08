import React from 'react'
import { useSelector } from 'react-redux'

export const IsCompany = ({children}) => {
    const company = useSelector(state=>state.auth.authenticated && state.auth.userData.company)
    return (
        <>
            {company && children}
        </>
    )
}
