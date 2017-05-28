import { combineReducers } from 'redux';
import accountList from './accountListReducer';
import timelineList from './timelineListReducer';

import componentReducer from './componentReducer';

const rootReducer = combineReducers({
  accountList,
  timelineList,
  componentReducer,
});

export default rootReducer;