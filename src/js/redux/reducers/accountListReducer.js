import { actionTypes as types } from '../constants';

const initialState = {
  accountList: '',
  fetching: false,
  fetched: false,
  err: ''
}

const accountList = (state = initialState, action) => {
  switch (action.type) {
    case types.ACCOUNT_LIST_REQUEST:
      return {...state, fetching: true}
    case types.ACCOUNT_LIST_SUCCESS:
      return {
          ...state,
          fetching: false,
          fetched: true,
          accountList: action.data,
        }
    case types.ACCOUNT_LIST_FAILURE:
      return {...state, fetching: false, err: action.data}
    default:
      return state
  }
}

export default accountList;