import React from 'react';
import styled from 'styled-components';
import logo from '../devhire.png'
import { Link } from 'react-router-dom';
import { socialLinks } from '../socialLinks';
import { useSelector } from 'react-redux';
import { AiOutlineCopyright } from 'react-icons/ai';
const StyledFooter = styled.footer`
    width: 100%;
    max-width: 1440px;
    height: 10vh;
    position: fixed;
    bottom: 0;
    left: 0;
    margin: auto;
    right:0;
    background: ${props => props.theme.gray};
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;;
    padding: .5rem 1rem;
    align-items: center;
    color:${props=>props.theme.darkerGray};
    z-index: 2;
    @media screen and (max-width: 315px){
        font-size: 10px;
        padding: 3px;
    }
    .avatar{
        display: none;
        @media screen and (max-width: 600px){
        display: inline-block;
        border-radius: 50%;
        overflow: hidden;
    }
    }
    
    
    @media screen  and (max-width: 700px){
        height: 15vh;
        
    }
    img{
        height: 1rem;
        @media screen and (max-width: 315px){
            height: .75rem;
        }
    }
.page-links, .socialLinks{
    a{
            
            transition: all .5s ease-in; 
            padding: .2rem .5rem;
            color:${props=>props.theme.darkerGray};
            svg{
                font-size: 1rem;
                @media screen and (max-width: 315px){
                    font-size: 10px;
                }
            }
            &:hover{
                color: ${props => props.theme.primaryColor};
                background-color: ${props=>props.theme.darkerGray};
               
            }
}
}
`
const Attribution = styled.div`
 font-size: 10px; 
 a { color:  ${props=>props.theme.background}}
 .copyright{
     margin-top: 1rem;
 }
`

export const Footer = () => {
    const isAuth = useSelector(state=> state.auth.authenticated)
    const user = useSelector(state => state.auth.authenticated && state.auth.userData)
    const guestLinks = [ 
        {page: 'Login' , link: '/login'},
        {page: 'Contact' , link: '/contact'}
         ]
    const devLinks = [
       
        {page: 'Contact' , link: '/contact'}
    ]
    const companyLinks = [
        {page: 'Add' , link: '/add'},
        {page: 'Devs' , link: '/devs'},
        {page: 'Contact', link:'/contact'}
    ]
const links = !isAuth ? guestLinks : user && user.dev ? devLinks : companyLinks

    return (
      
        <StyledFooter>
        <div className="logo"><Link to='/'><img src={logo} alt="logo"/></Link></div>
        <div className="page-links">
            { links
            
            .map((link,i)=><Link key={i} to={link.link}>{link.page}</Link>)}
        </div>
      
         {user?.dev &&<Link to={`/dev/${user.dev._id}`}><div  className="avatar"><img src={user.dev.avatar} alt={user.dev.fullname}/></div></Link>}
                {user?.company && <><Link to= {`/co/${user.company._id}`}><div  className="avatar"><img src={user.company.logo} alt={user.company.name}/></div></Link></>}
              
         <div className="socialLinks">
    {socialLinks.map((link,i)=><a href={link.href}>{link.icon}</a>)}
        </div>
    
         <Attribution >
         Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noopener noreferrer">Frontend Mentor</a>. <span><br/></span>
         Coded by <a href="http://twitter.com/watacle28" target='_blank' rel="noopener noreferrer">Cleopas T. Wangayi </a>.
         <div className="copyright">Copyright <AiOutlineCopyright/> <span>{new Date().getFullYear()}</span> DevHire </div>
       </Attribution> 
        </StyledFooter>
    
    )
}
