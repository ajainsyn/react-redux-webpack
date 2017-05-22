import { combineReducers } from "redux";
import accountList from './accountListReducer';
import timelineList from './timelineListReducer';

const rootReducer = combineReducers({
  accountList,
  timelineList
})

export default rootReducer;