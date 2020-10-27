import { combineReducers } from "redux";
import statics from "./staticsReducer";
import user from "./userReducer";
import item from "./itemReducer";

export default combineReducers({
  statics,
  user,
  item,
});
