import { combineReducers } from "redux";
import accountList from './accountListReducer';

const rootReducer = combineReducers({
  accountList
})

export default rootReducer;