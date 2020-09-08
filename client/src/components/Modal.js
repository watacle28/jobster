import React from 'react';
import styled from 'styled-components';

const StyledModal = styled.div` 
   
  position: fixed;
  top: 0;
  left: 0;
  bottom:0;
  width: 100%;
  min-height: 100vh;
  background: rgba(0,0,0,0.5);
 z-index: 9999;

div{
 
}
`

export const Modal = ({children}) => {
    return (
        <StyledModal>
            {children}
        </StyledModal>
    )
}
