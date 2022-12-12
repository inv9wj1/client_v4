import {ActionTypes} from '../constants/actionTypes';

const initialState = {
  jobid: '',
  jobname: ''
}

export const jobOutputReducer = (state = initialState, {type, payload}) => {
  // console.log('jobOutputReducer received type: ' + type);
  // console.log('jobOutputReducer received payload: ' + JSON.stringify(payload));
  switch (type) {
    case ActionTypes.SET_JOB_PARAMS:
      return {
        ...state,
        jobid: payload['jobid'],
        jobname: payload['jobname']
      }
    default:
      return state
  }
}