import {combineReducers} from 'redux';
import {authReducer} from "../reducers/authReducer";
import {jobsReducer} from './jobsReducer';
import { userReducer } from './userReducer';


const reducers = combineReducers({
auth: authReducer,
jobs: jobsReducer,
user: userReducer
});

export default reducers;

