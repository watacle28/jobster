import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector}  from 'react-redux'
import { Form } from '../components/StyledForm';
import { StyledBtn } from '../components/CustomButton';
import { Container_600 } from '../components/Container_600';
import { addJob, getSingleJob, editJob } from '../redux/actions/jobs';
import { IsCompany } from '../components/IsCompany';
import { Loader } from '../components/Loader';

const StyledAdd = styled.div` 
  opacity: ${props => props.loading ? .3 : 1};
  position: relative;
  form{
    width: 100%;
   
  }
  label{
    display : flex;
    flex-direction: column;
    align-items: center;
   width: 100%;
   max-width: 480px;
   margin-bottom: 1rem;
  }
  button{
    display: inline-block;
    width: 70%;
   max-width: 400px;
   height: 2rem;
   
  }
  .loader{
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
   
   
  }

`

export const Add = ({history,match:{params:{id}}}) => {
      const [data, setData] = useState({position: '', role:'', level:'', contract:'', location:'', languages:'', tools:''})
      const job = useSelector(state => state.jobs?.currentJob && state.jobs.currentJob);
      const loading = useSelector(state => state.jobs.loading)
      const dispatch = useDispatch()
      const handleDataChange = (e)=>{
        const {name, value} = e.target;
        setData({...data, [name]: value})
    }

  const publishJob = (e)=>{
      e.preventDefault();
    
    
     dispatch( addJob(data,history))

  }
  const saveChanges = (e) =>{
    e.preventDefault();
    dispatch(editJob(data,id))

  }
  useEffect(() => {
    if(id){
      dispatch(getSingleJob(id))

    }
    if(id && job){
      setData({...data, position: job.position, role: job.role, level: job.level,contract: job.contract, 
        location: job.location, languages: job.languages.toString(),tools: job.tools.toString() })
    }
    else{
      setData({position: '', role:'', level:'', contract:'', location:'', languages:'', tools:''})
    }
   
  }, [dispatch,job && job._id,id])
    return (
       
      <IsCompany>
          <Container_600>
          
            <StyledAdd loading={loading}>  
            {loading && <div className='loader'><Loader/></div>}
            <Form noValidate onSubmit={id ? saveChanges: publishJob}>
          <h2>{id ? 'Edit' : 'Enter'} Job Info</h2>
          <label htmlFor="position"> Position
            <input type="text" name='position'value={data.position}onChange={handleDataChange} placeholder='Senior Developer'/>
          </label>
          <label htmlFor="role"> Role
            <input type="text" name='role' value={data.role}onChange={handleDataChange} placeholder='Frontend'/>
          </label>
          <label htmlFor="level"> Level
            <input type="text" name ='level' value={data.level}onChange={handleDataChange} placeholder='Senior'/>
          </label>
          <label htmlFor="contract"> Contract
            <input type="text" name='contract' value={data.contract}onChange={handleDataChange} placeholder='Full Time'/>
          </label>
          <label htmlFor="location">Location
            <input type="text" name='location' value={data.location}onChange={handleDataChange} placeholder='USA Only'/>
          </label>
          <label htmlFor="languages"> Languages (comma separated)
            <input type="text" name='languages' value={data.languages}onChange={handleDataChange} placeholder='HTML, CSS'/>
          </label>
          <label htmlFor="tools"> Tools (comma separated)
            <input type="text" name ='tools' value={data.tools}onChange={handleDataChange} placeholder='Sass, Express'/>
          </label>
            <StyledBtn type='submit'>{id ? 'Edit' : 'Add'} Job</StyledBtn>
            </Form>

          </StyledAdd>
        </Container_600>
      </IsCompany>
       
    )
}
