import React, { useEffect,useState }from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import {socialLinks} from '../socialLinks'
import { useSelector, useDispatch } from 'react-redux';
import { loadUserData } from '../redux/actions/auth';


const StyledNav = styled.nav`
    display: flex;
   color: ${props=>props.theme.darkerGray};
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 600px){
        display: none;
    }
`

const Links = styled.ul`
    padding-inline-start:0;
    list-style: none;
    display: flex;
    width: 100%;
    font-weight: 700;
    align-items:center;
    margin-top:0;
    li{
        margin: auto .5rem;
        a{
            color:${props=>props.theme.darkerGray};
            transition: all .5s ease-in; 
            padding: .2rem .5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            svg{
                font-size: 1rem;
            }
            &:hover{
                color: ${props => props.theme.primaryColor};
                background-color: ${props=>props.theme.darkerGray};
               
            }
        }
    }
    img{
      
        width: 100%;

    }
    .avatar{
        width:2rem;
        height: 2rem;
        border-radius:50%;
        overflow:hidden;
        img{
            width: 100%;
            
        }
    }

`


export const Nav = ({setIsOpen,open}) => {

    
 const user = useSelector(state => state.auth.authenticated && state.auth.userData);

 const guestLinks = [
     {page: 'Contact' , link: '/contact'},
     {page: 'Login' , link: '/login'},
     {page: 'Register' , link: '/register'},
 ]
 
    return (
        <StyledNav>
          <Links style={{justifyContent:'flex-start'}}>
            {socialLinks.map((link,i)=>
            <li key={i}>  <a href={link.href} rel="noopener noreferrer" target='_blank'>{link.icon}</a></li>
                )}

              {user?.company &&  <li style={{marginLeft: '2rem'}}><Link to='/add'>Add Job</Link></li>}
            
          
        
            </Links>

            <Links  style={{justifyContent:'flex-end'}}>  
            {
                    user && <li style={{marginLeft: '2rem'}}><Link to='/contact'>Contact</Link></li>
                }
                {user?.dev && <li style={{marginLeft: '2rem'}}><Link to='#'><div onClick={()=>setIsOpen(!open)} className="avatar"><img src={user.dev.avatar} alt={user.dev.fullname}/></div></Link></li>}
                {user?.company && <li style={{marginLeft: '2rem'}}><Link to= '#'><div onClick={()=>setIsOpen(!open)} className="avatar"><img src={user.company.logo} alt={user.company.name}/></div></Link></li>}
              

            {!user && guestLinks.map((link,i)=>
               <li key={i}>
                   <Link to={link.link}>{link.page}</Link>
               </li>
            )}
            </Links>
        </StyledNav>
    )
}
