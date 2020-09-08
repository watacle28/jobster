import {REGISTER_SUCCESS,LOGIN_SUCCESS,LOGOUT,LOADING, LOGIN_FAILURE,SET_ERRORS, ISAUTH, REGISTER_FAILURE, USER_LOADED, PROFILE_UPDATE_SUCCESS} from '../types';

const initialState = {
    authenticated: false,
    
    loading: true,
    userData: null,
    errors: {}
}

export const authReducer = (state = initialState,{type,payload}) =>{
   switch (type) {
       case ISAUTH :
           return{
               ...state, authenticated: true
           }
        case USER_LOADED :
            return {
                ...state, errors: null, userData: payload, loading:false
            }
        case PROFILE_UPDATE_SUCCESS:
            return {
                ...state, errors: null, loading: false, userData: payload
            }
       case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
               authenticated: true,
               userData: payload,
                loading: false,
                errors: null
            }
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
            return{
                ...state,userData: null, authenticated: false,errors:payload,loading: false
            }
        case LOGOUT:
            
            return{
                ...state, authenticated: false,loading: false,errors:null, userData: null
            }
       
        case SET_ERRORS:
            return {
                ...state,errors: payload, loading: false
            }
   
       default:
          return state;
   }
}