import React from 'react';
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { StyledBtn } from '../components/CustomButton';
import { Link } from 'react-router-dom';

const StyledLost = styled.div`
     width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-weight: 700;
    overflow-y: hidden;
   h2{
       font-size: 8rem;
       margin-bottom: 2rem;
       } 
`

export const Lost = () => {
    return (
        <StyledLost>
            <Helmet>
          <title>404</title>
          <meta name="description" content="Error page" />
         
        </Helmet>
            <h2>404</h2>
          <p>Yikes, Chum!, Looks like you wondered off a tad</p>
         <Link to='/'> <StyledBtn>Go Back Home</StyledBtn></Link>
        </StyledLost>
    )
}
