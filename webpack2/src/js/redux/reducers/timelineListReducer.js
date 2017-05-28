import { actionTypes as types } from '../constants';

const initialState = {
  timelineList: '',
  fetching: false,
  fetched: false,
  err: '',
};

const timelineList = (state = initialState, action) => {
  switch (action.type) {
  case types.TIMELINE_LIST_REQUEST:
    return {...state, fetching: true};
  case types.TIMELINE_LIST_SUCCESS:
    return {
      ...state,
      fetching: false,
      fetched: true,
      timelineList: action.data,
    };
  case types.TIMELINE_LIST_FAILURE:
    return {...state, fetching: false, err: action.data};
  default:
    return state;
  }
};
export default timelineList;