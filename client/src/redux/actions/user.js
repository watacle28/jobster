import axios from 'axios';
import { GET_ALL_DEVS, SET_ERRORS, APPLY, LOADING } from '../types';
import { getAllJobs } from './jobs';


axios.defaults.baseURL = 'http://localhost:5003/api'

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
        dispatch({type: LOADING})
        const {data:{msg}} = await axios.post(`/dev/apply/${jobId}`)
        dispatch({type: APPLY, payload: msg })
        dispatch(getAllJobs())

    } catch (error) {
        dispatch({type: SET_ERRORS, payload: error.response.data.msg})
    }
}
