import axios from 'axios';
import { GET_ALL_DEVS, SET_ERRORS, APPLY, LOADING, APPLYING } from '../types';
import { getAllJobs } from './jobs';


axios.defaults.baseURL = '/api'

export const getAllDevs = () => async dispatch=>{
    try {
        const res = await axios.get('/company/devs')
       
        dispatch({type: GET_ALL_DEVS, payload: res.data.devs})

    } catch (error) {
        console.log({error});
    }
}

export const applyToJob = (jobId) => async dispatch => {
    try {
        dispatch({type: APPLYING, payload: jobId
        })
        const res = await axios.post(`/dev/apply/${jobId}`)
        console.log(res);
        dispatch({type: APPLY, payload:res.data })
        // dispatch(getAllJobs())

    } catch (error) {
        dispatch({type: SET_ERRORS, payload: error.message})
    }
}
