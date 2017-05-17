import { actionTypes as types, urls } from '../constants';
import { get } from '../helpers';

export const getAccountList = () => dispatch => {
  dispatch({ type: types.ACCOUNT_LIST_REQUEST })
  get({
    url: urls.ACCOUNTLIST,
    success: types.ACCOUNT_LIST_SUCCESS,
    failure: types.ACCOUNT_LIST_FAILURE,
    dispatch,
  })
}
