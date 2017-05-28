import { actionTypes as types } from '../constants';

const initialState = {
  showComponent: false,
};

const component = (state = initialState, action) => {
  switch (action.type) {
  case types.SHOW_NEW_COMPONENT:
    return {...state, showComponent: true};
  case types.HIDE_NEW_COMPONENT:
    return { ...state, showComponent: false };
  default:
    return state;
  }
};

export default component;