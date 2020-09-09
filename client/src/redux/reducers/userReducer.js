import { GET_ALL_DEVS, APPLY, LOADING, APPLYING } from "../types";

const initialState = {
    devs: [],
    applying: false,
    errors: []

}

export const userReducer = (state = initialState, {type,payload})=>{
    switch (type) {
        // case APPLYING: 
        //     return {
        //         ...state, applying: true
        //     }
       case GET_ALL_DEVS :
           return {
               ...state, devs: payload,applying: false, errors: null 
           }
        // case APPLY:
        //     return {
        //         ...state, applying: false
        //     }
        default:
            return state
    }
}