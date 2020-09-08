import React from 'react';
import styled from 'styled-components';
import { StyledBtn } from './CustomButton';
import { Link } from 'react-router-dom';
import { ImageUpload } from './ImageUpload';
import { useSelector, useDispatch } from 'react-redux';
import { getAllJobs } from '../redux/actions/jobs';
import { IsCompany } from './IsCompany';
import { logout } from '../redux/actions/auth';

const StyledCo = styled.div`
    position: absolute;
    right:0;
    z-index:99;
     display : flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 1px 5px 20px ${props => props.theme.gray};
    width: 300px;
    background-color: ${props =>props.theme.background};
    padding: 1rem;
    transition : translate 1s ease;
    color:${props =>props.theme.primaryColor}; ;
    transform: ${props => props.open === true ? "translateX(0)": "translateX(-100vw)"};
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

export const CompanyProfile = ({open}) => {
     const dispatch = useDispatch()
    const company = useSelector(state => state.auth.userData && state.auth.userData?.company)

    return (
       <IsCompany>
            <StyledCo open={open}>
            <ImageUpload avatar ={company.logo} user='company'/>
            
            <h2>{company.name}</h2>
          {company.location &&   <span>Based in {company?.location}</span>}
            <p>we are web app start up company</p>
            <div className="coa">
               <Link to='/edit/co'> <StyledBtn secondary>UPDATE</StyledBtn></Link>
                <StyledBtn onClick={()=>dispatch(logout())}>SIGN OUT</StyledBtn>
            </div>
           {getAllJobs.length > 0 &&  <div className="skills-jobs">
                <h3>Jobs</h3>
               <div className="list">
               {company?.jobs.map((job,i)=><span key={i}>{job}</span>)}
               </div>
            </div>}
            
        </StyledCo>
       </IsCompany>
    )
}
