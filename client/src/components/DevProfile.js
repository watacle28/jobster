import React from 'react';
import styled from 'styled-components';

import avatar from '../dummy.jpg';
import { StyledBtn } from './CustomButton';
import { Link } from 'react-router-dom';
import { ImageUpload } from './ImageUpload';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IsDev } from './IsDev';
import { logout } from '../redux/actions/auth';

const StyledDev = styled.div`
    position: absolute;
    right:0;
     display : flex;
    flex-direction: column;
    z-index: 99;
    align-items: center;
    box-shadow: 1px 5px 20px ${props => props.theme.gray};
    width: 300px;
    background-color: ${props =>props.theme.background};
    padding: 1rem;
    transition : translate 1s ease;
    transform: ${props => props.open ? "translateX(0)": "translateX(-100vw)"};
    color:  ${props =>props.theme.primaryColor};
    @media screen and (max-width : 600px){
        transform: translateX(0);
        position: initial;
        z-index: 0;
        right: auto;
        width: auto;
        box-shadow:none;
    }
    span{
        color:  ${props =>props.theme.darkerGray};
    }
    p{
        text-align: center;
    }
    
    .coa{
        display: flex;
        button:first-of-type{
            margin-right: 1rem;
        }
    }
 .skills-jobs{
     width: 100%;
     margin: auto;
     text-align: center;
     h3{font-weight: 700};
    .list{
        width: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        span{
            padding: .2rem .4rem;
            border: 1px solid ${props => props.theme.gray};
            border-radius: 200px;
            margin-right: .5rem;
            margin-bottom: .5rem;
            font-weight: 700;
        }
    }
 }

`

export const DevProfile = ({open}) => {
    const dev = useSelector(state=> state.auth.userData?.dev)
 const dispatch = useDispatch()
 
    const skills = dev?.stack
   
  
    return (
        <IsDev>
            <StyledDev open={open}>
            <ImageUpload avatar ={dev?.avatar} user='dev'/>

            <h2>{dev.fullname}</h2>
            <span>{dev?.role}</span>
            <p>{dev?.bio}</p>
            <div className="coa">
               <Link to={`/edit/dev/${dev._id}`}> <StyledBtn secondary>UPDATE</StyledBtn></Link>
               <StyledBtn onClick={()=>dispatch(logout())}>SIGN OUT</StyledBtn>
            </div>
           {skills.length > 0 &&  <div className="skills-jobs">
                <h3>Skills</h3>
               <div className="list">
               {skills.map((skill,i)=><span key={i}>{skill}</span>)}
               </div>
            </div>}
            
        </StyledDev>
        </IsDev>
    )
}
