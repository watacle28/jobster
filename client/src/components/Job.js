import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {BsDot} from 'react-icons/bs'
import {StyledBtn} from './CustomButton'
import { useDispatch,useSelector } from 'react-redux';
import { addFilter, deleteJob, getSingleJob } from '../redux/actions/jobs';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { applyToJob } from '../redux/actions/user';


const StyledJob = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 20px;
  box-shadow: 1px 5px 20px ${props => props.theme.gray};
  margin: 1rem;
  border-left: 5px solid ${props =>props.theme.primaryColor};
  border-radius: 5px;
  @media screen and (max-width: 500px){
        flex-direction: column;
        align-items: flex-start;
      }
  button{
    margin-left: 0;
  }
  .company-logo{
      margin-right: 1rem;
      width: 100px;
      height: 100px;
      @media screen and (max-width: 500px){
        margin-bottom: 1rem;
        width: 60px;
        height: 60px;
      }
      img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
         object-fit: contain;
      }
  }
  .job-details{
      display: flex;
      flex-direction: column;
      color: ${props => props.theme.darkerGray};
  }
  .job-header{
      flex: 1;
    display: flex;
    align-items: center;
    text-transform: capitalize;
  }
  .pill{
  margin-left: 1rem;
  background-color:${props => props.theme.primaryColor};
  border-radius: 20px;
  color: white;
  font-weight: 700;
  padding: .05rem .5rem;
  text-transform: uppercase;
  line-height: 2;
  }
  .new{ background-color:${props => props.theme.darkerGray};}
  .job-features{
      flex: 1;
      width: 100%;
      color: ${props=>props.theme.primaryColor};
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      align-items: center;
      @media screen and (max-width: 500px){
        justify-content: flex-start;
      }
      span{
           cursor: pointer;
          margin: 0 .5rem .5rem;
          padding: .1rem .6rem;
          background-color: ${props=>props.theme.background};
          transition: all .5s ease;
          padding: .2rem .5rem;
          @media screen and (max-width: 500px){
        margin-left:0;
        padding-left: 0;
      }
          
        &:hover{
           background-color: ${props=>props.theme.primaryColor};
           color:  ${props=>props.theme.background};
        }
      }
  }
  .owner-actions{
    color: ${props => props.theme.gray};
    a{
      color:  ${props => props.theme.gray};
      
    }
    svg{
      margin-right: 1rem;
      margin-bottom: 1rem;
      cursor: pointer;
      transition: color .5s ease-in-out;
      &:hover{
        color: ${props => props.theme.primaryColor};
      }
    }
  }
  .loading{
    width: 60%;
    height: 100%;
    overflow: hidden;
  }
`

export const Job = ({job}) => {
    const [active, setActive] = useState(false)
    const dispatch = useDispatch();
    const currentJob = useSelector(state => state.jobs.currentJob)
    const user = useSelector(state => state.auth.authenticated && state.auth.userData)
    const filterables = [job.role, job.level, ...job.languages, ...job.tools]
    const [Applied, setApplied ] = useState(job.applications.includes(user.dev?._id) )
   
     
 
   

    dayjs.extend(relativeTime)
    const apply = (jobId)=>{
      setActive(true)
      dispatch(applyToJob(jobId))
     
    }
    useEffect(() => {
     if(currentJob._id == job._id && currentJob.applications?.includes(user.dev?._id)){
          setApplied(true)
 }
         //  dispatch(getSingleJob(job._id))
      
      
     
    }, [currentJob.applications?.length , job.applications?.length])

    return (
        <StyledJob>
         
         <div className="company-logo">
          <img src={job.logo} alt="logo" />
        </div>
       <div className="job-details">
       <div className = 'job-header'>
        <div>{job.company}</div>

       {job.new && <div className='pill new'>NEW!</div>}

       {job.featured && <div className='pill'>FEATURED</div>}
      </div>

   
       <div>
       <h3 >{job.position}</h3>
        <p>
          {dayjs(job.postedAt).fromNow()}
          <span><BsDot/></span> {job.contract} <span><BsDot/></span>
          {job.location}
        </p>
       {user.dev && user.dev.profileComplete && 
       <StyledBtn
        disabled={Applied || currentJob._id == job._id && currentJob.applying } 
        onClick={()=>apply(job._id)}>{(currentJob._id == job._id && currentJob.applying ) ? 'Applying...' : Applied ? 'Applied' : 'Apply' }
       </StyledBtn>}
        {user.company && user.company.name == job.company && <div className='owner-actions'>
          <Link to={`/edit/${job._id}`}>  <FaEdit /> </Link>
          <FaTrash onClick={()=>dispatch(deleteJob(job._id))}/>
          </div>}
       </div>
    
       </div>
        <div className="job-features">
           
            {filterables.map((pill,i) => <span key={i} onClick={()=> dispatch(addFilter(pill))}>{pill}</span>)}
        </div>
        
        </StyledJob>
    )
}
