import { combineReducers } from "redux";
import statics from "./staticsReducer";
import user from "./userReducer";

export default combineReducers({
  statics,
  user,
});
