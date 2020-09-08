import {combineReducers} from 'redux';
import {authReducer} from "../reducers/authReducer";
import {jobsReducer} from './jobsReducer';
import {uiReducer} from './uiReducer';
import { userReducer } from './userReducer';


const reducers = combineReducers({
auth: authReducer,
jobs: jobsReducer,
ui: uiReducer,
user: userReducer
});

export default reducers;

