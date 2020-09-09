import React from 'react'
import styled from 'styled-components';
import { Job } from '../components/Job';
import Helmet from 'react-helmet'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs, getFilteredJobs } from '../redux/actions/jobs';
import { FiltersBar } from '../components/FiltersBar';
import { Container_1000 } from '../components/Container_1000px';
import { Loader } from '../components/Loader';
const StyledHome = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
   .jobs_found{
       margin: 2rem auto;
       color: ${props=>props.theme.darkerGray};
       font-weight: 900;
   }
`

export const Home = () => {


    const dispatch = useDispatch();
    const jobs = useSelector(state => state.jobs && state.jobs.jobs)
    const filters = useSelector(state => state.jobs && state.jobs.filters)
    const loading = useSelector(state => state.jobs.loading)
   
    useEffect(() => {
        if(filters.length > 0){
            dispatch(getFilteredJobs())
        }
       else {dispatch(getAllJobs())} 
       
    }, [dispatch,jobs.length, filters.length])
   
    return (
       <Container_1000>
          {loading ? <Loader/> :
            <StyledHome>
                  <Helmet>
          <title>Home | Jobs</title>
          <meta name="description" content='List of jobs' />
         
        </Helmet>
            {filters.length > 0 && <FiltersBar filters={filters}/>}
           {jobs.length > 0 && 
            <div className="jobs_found">
              Found {jobs.length} Jobs
            </div>}
            {jobs.map(job => <Job key={job._id} job={job}/>)}
             </StyledHome>
       
          }
       </Container_1000>
    )
}
