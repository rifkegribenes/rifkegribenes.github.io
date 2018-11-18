import update from "immutability-helper";

import { LOGOUT } from "../actions";
import {
  GET_ALL_PROJECTS_REQUEST,
  GET_ALL_PROJECTS_SUCCESS,
  GET_ALL_PROJECTS_FAILURE,
  GET_PROJECT_BY_ID_REQUEST,
  GET_PROJECT_BY_ID_SUCCESS,
  GET_PROJECT_BY_ID_FAILURE,
  ADD_PROJECT_REQUEST,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAILURE,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  HANDLE_INPUT,
  HANDLE_DELETE_OPEN,
  HANDLE_DELETE_CLOSE,
  CLEAR_FORM,
  SET_EDIT_PROJECT
} from "../actions/apiProjectActions";

const INITIAL_STATE = {
  loading: false,
  projects: [],
  deleteDialogOpen: false,
  currentProject: {
    id: "",
    title: "",
    body: "",
    screenshot_url: "",
    github_url: "",
    live_url: "",
    created_at: "",
    updated_at: "",
    tag_names: []
  },
  form: {
    title: "",
    body: "",
    screenshot_url: "",
    github_url: "",
    live_url: "",
    tags: "",
    tag: "",
    dialogOpen: false
  },
  error: null
};

function project(state = INITIAL_STATE, action) {
  let error;

  switch (action.type) {
    case LOGOUT:
      return INITIAL_STATE;

    case HANDLE_INPUT:
      return update(state, {
        form: {
          [action.payload.name]: { $set: action.payload.value }
        }
      });

    case HANDLE_DELETE_OPEN:
      return update(state, {
        deleteDialogOpen: { $set: true },
        currentProject: { $set: { ...action.payload.selectedProject } }
      });

    case HANDLE_DELETE_CLOSE:
    case DELETE_PROJECT_SUCCESS:
      return update(state, {
        deleteDialogOpen: { $set: false },
        currentProject: {
          id: { $set: "" },
          title: { $set: "" },
          body: { $set: "" },
          screenshot_url: { $set: "" },
          github_url: { $set: "" },
          live_url: { $set: "" },
          created_at: { $set: "" },
          updated_at: { $set: "" },
          tag_names: { $set: [] }
        },
        loading: { $set: false },
        error: { $set: null }
      });

    case SET_EDIT_PROJECT:
      return update(state, {
        form: {
          title: { $set: action.payload.title },
          body: { $set: action.payload.body },
          screenshot_url: { $set: action.payload.screenshot_url },
          github_url: { $set: action.payload.github_url },
          live_url: { $set: action.payload.live_url },
          tags: { $set: action.payload.tag_names.join(", ") }, // convert array to comma-separated string
          tag: { $set: "" },
          dialogOpen: { $set: false }
        }
      });

    case CLEAR_FORM:
      return update(state, {
        form: {
          title: { $set: "" },
          body: { $set: "" },
          screenshot_url: { $set: "" },
          github_url: { $set: "" },
          live_url: { $set: "" },
          tags: { $set: "" },
          tag: { $set: "" },
          dialogOpen: { $set: false }
        }
      });

    case GET_ALL_PROJECTS_REQUEST:
    case GET_PROJECT_BY_ID_REQUEST:
    case ADD_PROJECT_REQUEST:
    case UPDATE_PROJECT_REQUEST:
    case DELETE_PROJECT_REQUEST:
      return update(state, {
        loading: { $set: true },
        error: { $set: null }
      });

    case GET_ALL_PROJECTS_SUCCESS:
      return update(state, {
        loading: { $set: false },
        projects: { $set: action.payload.projects },
        error: { $set: null }
      });

    case GET_PROJECT_BY_ID_SUCCESS:
    case ADD_PROJECT_SUCCESS:
    case UPDATE_PROJECT_SUCCESS:
      console.log(action.type);
      console.log(action.payload);
      return update(state, {
        loading: { $set: false },
        currentProject: { $set: action.payload[0] },
        error: { $set: null }
      });

    case GET_ALL_PROJECTS_FAILURE:
    case GET_PROJECT_BY_ID_FAILURE:
    case ADD_PROJECT_FAILURE:
    case UPDATE_PROJECT_FAILURE:
    case DELETE_PROJECT_FAILURE:
      if (typeof action.payload.message === "string") {
        error = action.payload.message;
      } else {
        error = "Sorry, something went wrong :(\nPlease try again.";
      }
      return update(state, {
        loading: { $set: false },
        error: { $set: error }
      });

    default:
      return state;
  }
}

export default project;
