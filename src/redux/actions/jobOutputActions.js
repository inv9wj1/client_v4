import { ActionTypes } from "../constants/actionTypes";

export const setJobParams = (jobParams) => {
  return {
    type: ActionTypes.SET_JOB_PARAMS,
    payload: jobParams,
  };
}
