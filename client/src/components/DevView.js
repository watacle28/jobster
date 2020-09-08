import React from 'react';
import styled from 'styled-components';

import avatar from '../dummy.jpg';
import { StyledBtn } from './CustomButton';
import { Link } from 'react-router-dom';
import { ImageUpload } from './ImageUpload';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { IsCompany } from './IsCompany';

const StyledDev = styled.div`
   
     display : flex;
    flex-direction: column;
    z-index: 99;
    align-items: center;
    box-shadow: 1px 5px 20px ${props => props.theme.gray};
    width: 300px;
    background-color: ${props =>props.theme.background};
    padding: 1rem;
    transition : translate 1s ease;
   .img_container{
       width:120px;
       margin: auto;
       height: auto;
       img{
           width: 100%;
           height: 120px;
          object-fit: cover;
           border-radius: 50%;
           
       }
   }
    span{
        color:  ${props =>props.theme.darkerGray};
    }
    p{
        text-align: center;
    }
    
    .coa{
        display: flex;
       
    }
 .skills-jobs{
     width: 100%;
     h3{font-weight: 700};
    .list{
        width: 100%;
        display: flex;
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

export const DevView = ({dev}) => {
 
 
    const skills = dev?.stack
   
  
    return (
        <IsCompany>
            <StyledDev>
           <div className="img_container">
               <img src={dev.avatar} alt={dev.fullname}/>
           </div>

            <h2>{dev.fullname}</h2>
            <span>{dev?.role}</span>
            <p>{dev?.bio}</p>
            {dev.resume && <div className="coa">
               <a href={dev.resume} target ='_blank'> <StyledBtn secondary>GET RESUME</StyledBtn></a>
               
            </div>}
           {skills.length > 0 &&  <div className="skills-jobs">
                <h3>Skills</h3>
               <div className="list">
               {skills.map((skill,i)=><span key={i}>{skill}</span>)}
               </div>
            </div>
            }
        </StyledDev>
        </IsCompany>
    )
}
