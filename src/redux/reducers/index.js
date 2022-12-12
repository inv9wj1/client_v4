import {combineReducers} from 'redux';
import {changeState} from './changeState';
import {authReducer} from './auth';
import {jobOutputReducer} from './jobOutputReducer';


const combineReducersObject = {
  changeState: changeState,
  authReducer: authReducer,
  jobOutputReducer: jobOutputReducer,}

export const reducers = combineReducers(combineReducersObject);

