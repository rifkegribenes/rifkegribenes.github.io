import { combineReducers } from "redux";
import appState from "../reducers/appState";
import profile from "../reducers/profile";
import project from "../reducers/project";

const rootReducer = combineReducers({
  appState,
  profile,
  project
});

export default rootReducer;
