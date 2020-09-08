import React from 'react';
import styled from 'styled-components'
import { Header } from './Header'
import { Footer } from './Footer'

const StyledLayout = styled.div`

  max-width: 1440px;
  height: auto;
  margin : 0 auto;
`

const StyledChildren = styled.section`
  min-height: 20vh;
  width: 100%;
  max-width: 1000px;
   margin:0 auto 11vh;
 
  `

export const Layout = ({children}) => {
    return (
        <StyledLayout>
          <Header/>
          <StyledChildren >
          {children}
          </StyledChildren>
          <Footer/> 
        </StyledLayout>
    )
}
