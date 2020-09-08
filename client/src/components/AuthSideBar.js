import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import {  StyledBtn } from './CustomButton';

const StyledBar = styled.div`   
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.primaryColor};
    color: ${props => props.theme.background};
    padding: 1rem;
    line-height: 2; 
    width: 100%;
    max-width: 350px;
    margin: auto;
    border-radius:5px;
   
    @media screen and (max-width: 700px){
      margin-top: -16vh;
      margin-bottom:16vh;
    }
 
    a{
     color: hsl(180, 29%, 50%);
    }
    button{
        width: 60%
    }
`

export const AuthSideBar = ({url}) => {
    return (
        <StyledBar>
           {url ==='login' ? <h2>Already with us?</h2> : <h2>New here?</h2>} 
           {url === 'login' ? <p>To keep enjoying our services  please login with your details</p>:
           <p>Please enter your personal details and   start the journey towards your dream job</p>}
         <Link to={`/${url}`}> <StyledBtn medium secondary>{url}</StyledBtn></Link>
        </StyledBar>
    )
}
