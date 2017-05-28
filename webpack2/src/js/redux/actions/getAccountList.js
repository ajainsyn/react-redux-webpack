import { actionTypes as types, urls } from '../constants';
import { get } from '../helpers';

export const getAccountList = () => dispatch => {
  dispatch({ type: types.ACCOUNT_LIST_REQUEST });
  get({
    url: urls.ACCOUNTLIST,
    success: types.ACCOUNT_LIST_SUCCESS,
    failure: types.ACCOUNT_LIST_FAILURE,
    dispatch,
  });
};

export const getTimelineList = () => dispatch => {
  dispatch({ type: types.TIMELINE_LIST_REQUEST });
  get({
    url: urls.TIMELINELIST,
    success: types.TIMELINE_LIST_SUCCESS,
    failure: types.TIMELINE_LIST_FAILURE,
    dispatch,
  });
};

export const showNewComponent = () => dispatch => {
  dispatch({ type: types.SHOW_NEW_COMPONENT });
};

export const hideComponent = () => dispatch => {
  dispatch({ type: types.HIDE_NEW_COMPONENT });
};

