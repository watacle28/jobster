import { LOADING, GET_ALL_JOBS, JOB_ADDED, ADD_FILTER, GET_FILTERED_JOBS, REMOVE_FILTER, CLEAR_FILTERS, EDIT_JOB, REMOVE_JOB, GET_SINGLE_JOB, SET_ERRORS, APPLYING, APPLY } from "../types"


const initialState = {
   jobs: [],
   currentJob: {
       applying: false,
   },
   allJobs:[],
    errors: null,
    filters:[],
    
}


export const jobsReducer = (state = initialState,{type,payload})=>{

    const filteredJobs = state.allJobs.filter((job) => {
       
       let filterables = [
          job.role,
          job.level,
          ...job.languages,
          ...job.tools,
        ].map(filter => filter.toLowerCase());
    
        return state.filters.every((filter) => filterables.includes(filter.toLowerCase()));
      });
      
    switch (type) {
        case LOADING:
            return {
                ...state, loading: true
            }
        case APPLYING:
          
            return {
                ...state, currentJob:{_id: payload, applying: true}
            }    
        case SET_ERRORS:
            return {
                ...state, errors: payload, loading: false
            }    
        case GET_ALL_JOBS:
           state.allJobs = [...payload]
            return{
                ...state,jobs: payload,errors:null, loading: false
            }
        case GET_FILTERED_JOBS:
            return{
                ...state,jobs:filteredJobs,errors:null, loading: false
            } 
       
       
         case   JOB_ADDED :
            console.log(state,payload)
            
             return {
                 ...state,payload, errors: null, loading: false
             } 
            
         case ADD_FILTER: 

              return {
                  ...state,job:filteredJobs, filters: [...state.filters, payload], loading: false, errors: null
              }
         case REMOVE_FILTER: 
             
              return {
                ...state,filters:state.filters.filter(filter => filter !== payload), loading: false, errors: null
              }
         case CLEAR_FILTERS: 
              return{
                  ...state, filters:[], loading: false, errors: null
              } 
         case GET_SINGLE_JOB:
             return {
                 ...state, currentJob: payload,loading: false, errors: null
             }         
         case EDIT_JOB:
             //locate job to edit
            let jobIndex = state.jobs.findIndex(job => job._id == payload._id);
            state.jobs[jobIndex] = payload
             return {
                 ...state, loading: false, errors: null
             } 
             case APPLY:
                  //locate job to edit
            let index = state.jobs.findIndex(job => job._id == payload.updatedJob._id);
            state.jobs[index] = payload.updatedJob
                return {
                    ...state,currentJob:{...payload.updatedJob,applying: false}
                }
         case REMOVE_JOB:
            
             return {
                 ...state, jobs: state.jobs.filter(job => job._id !== payload), loading: false, errors: null
             }    
        default:
            return state;
    }
}