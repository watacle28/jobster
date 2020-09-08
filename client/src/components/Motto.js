import React from 'react';
import styled from 'styled-components';
import logo from '../devhire.png'
import { Link } from 'react-router-dom';


const StyledMotto = styled.div`
    width : 100%;
    max-height: 100%;
    margin: -2.5rem auto .5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 600px){
        margin-top: 0;
    }
    h1{
        text-align: center;
        font-size: 1rem;
        margin: 1rem auto;
        font-weight: 400;
        text-transform: capitalize;
        color: ${props => props.theme.background};
    }
    img{
        height: 1rem;
        object-fit: contain;
        transition: all .6s ease-out;
        &:hover{
            transform: scale(1.05)
        }
    }
    span{
        /* background-color: ${props => props.theme.background};
        color: ${props => props.theme.primaryColor};
        padding: .1rem .5rem; */
        font-weight: 700;
       
    }
`

export const Motto = () => {
    return (
        <StyledMotto>
           <Link to='/'> <img src={logo} alt="logo"/></Link>
          <h1>Serving the <span style={{color:'hsl(180, 14%, 20%)'}}>Dev</span>  society with <span style={{color:'hsl(180, 14%, 20%)'}}>jobs</span></h1> 
        </StyledMotto>
    )
}
