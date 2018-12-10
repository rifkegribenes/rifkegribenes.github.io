import { combineReducers } from "redux";
import appState from "../reducers/appState";
import profile from "../reducers/profile";
import project from "../reducers/project";
import contact from "../reducers/contact";

const rootReducer = combineReducers({
  appState,
  profile,
  project,
  contact
});

export default rootReducer;
