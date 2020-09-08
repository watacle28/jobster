import {
  
   
    SET_ERRORS, GET_ALL_JOBS, LOADING, JOB_ADDED, ADD_FILTER, REMOVE_FILTER,CLEAR_FILTERS, GET_FILTERED_JOBS, EDIT_JOB, REMOVE_JOB, GET_SINGLE_JOB
} from '../types';

import {setAuthToken} from '../../utils/setAtuthToken'
import axios from 'axios';



axios.defaults.baseURL = 'http://localhost:5003/api'


export const getAllJobs = () => async dispatch => {
    try {
        dispatch({
            type: LOADING
        })
        const res = await axios.get(`public/jobs`)
        
        const jobs = res.data.jobs
       
        dispatch({
            type: GET_ALL_JOBS,
            payload: jobs
        })
    } catch (error) {
        // dispatch({type: POST_NOT_FOUND})
    }
}
export const getFilteredJobs = () => async dispatch => {

    dispatch({
        type: GET_FILTERED_JOBS,
       
    })

}

export const addFilter = (filter) => async (dispatch, getState) => {
 
   if(!getState().jobs.filters.includes(filter)){
    dispatch({
        type: ADD_FILTER,
        payload: filter
    })
   dispatch({type: GET_FILTERED_JOBS})
   }
  
}

export const removeFilter = (filter) => async dispatch => {

    dispatch({
        type: REMOVE_FILTER,
        payload: filter
    })
    // dispatch({type: GET_FILTERED_JOBS})
}

export const clearFilters = () => async dispatch => {

    dispatch({
        type: CLEAR_FILTERS,
      
    })
   
}

export const getSingleJob = (id) => async dispatch => {
    try {
        dispatch({
            type: LOADING
        })
        const res = await axios.get(`public/jobs/${id}`)
        const payload = res.data.job
        dispatch({
            type: GET_SINGLE_JOB,
            payload
        })
        
    } catch (error) {
        dispatch({
            type: SET_ERRORS,
            payload: error
        })
    }
}

export const addJob = (job, history) => async dispatch => {
    try {

        const token = localStorage.getItem('token')
        setAuthToken(token)
        dispatch({
            type: LOADING
        })
        const res = await axios.post('/job/create', job)
        
        dispatch({
            type: JOB_ADDED,
            payload: res.data.newJob
        })
        history.push(`/`)

    } catch (error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data.message
        })
        console.log(error)
    }
}

// export const editPost = (data, id, history) => async dispatch => {
//     try {
//         const token = localStorage.getItem('token')
//         setAuthToken(token)
//         const res = await axios.put(`blog/edit/${id}`, data)
//        console.log({res});
//         dispatch({
//             type: LOADING
//         })
        
//         dispatch({
//             type: EDIT_SUCCESS,
//             payload: res.data.editedPost
//         })
//         history.push(`/post/${id}`)

//     } catch (error) {
//         console.log(error);
//     }
// }
// export const deletePost = (id, history) => async dispatch => {
//     try {
//         const token = localStorage.getItem('token')
//         setAuthToken(token)
//         const res = await axios.delete(`blog/post/${id}`)
//         toast(res.data.msg, {
//             type: 'success'
//         })
      
//         dispatch({
//             type: REMOVE_POST,
//             payload: id
//         })
//         history.push(`/`)

//     } catch (error) {
//         console.log(error);
//     }
// }

// export const likePost = (id, userId) => async dispatch => {

//     try {
//         const token = localStorage.getItem('token')
//         setAuthToken(token)
//         const res = await axios.post(`blog/like/${id}`)

//         dispatch({
//             type: LIKE_POST,
//             payload: res.data.user
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const unlikePost = (id, userId) => async dispatch => {
//     try {
//         const token = localStorage.getItem('token')
//         setAuthToken(token)
//         const res = await axios.delete(`blog/like/${id}`)
//         dispatch({
//             type: UNLIKE_POST,
//             payload: res.data.user
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const addComment = (comment, id) => async dispatch => {
//     try {
//         const token = localStorage.getItem('token')
//         setAuthToken(token)
//         const res = await axios.post(`blog/comment/${id}`, {
//             comment
//         })

//         dispatch({
//             type: ADD_COMMENT,
//             payload: res.data
//         })


//     } catch (error) {
//         console.log(error)
//     }
// }

export const editJob = (data, id) => async dispatch => {
    dispatch({type: LOADING})
    try {
        const token = localStorage.getItem('token')
        setAuthToken(token)
        const res = await axios.put(`job/edit/${id}`, 
            data
        )

        dispatch({
            type: EDIT_JOB,
            payload: res.data.editedJob
        })


    } catch (error) {
        console.log(error)
    }
}




export const deleteJob = (id) => async dispatch => {
    try {
        const token = localStorage.getItem('token')
        setAuthToken(token)
        await axios.delete(`job/delete/${id}`)
        dispatch({
            type: REMOVE_JOB,
            payload: id
        })
    } catch (error) {
        console.log({
            error
        });
    }

}