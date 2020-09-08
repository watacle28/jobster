import { GET_ALL_DEVS, APPLY, LOADING } from "../types";

const initialState = {
    devs: [],
  
    loading: true,
    errors: []

}

export const userReducer = (state = initialState, {type,payload})=>{
    switch (type) {
        case LOADING: 
            return {
                ...state, loading: true
            }
       case GET_ALL_DEVS :
           return {
               ...state, devs: payload,loading: false, errors: null 
           }
        case APPLY:
            return {
                ...state, loading: false
            }
        default:
            return state
    }
}