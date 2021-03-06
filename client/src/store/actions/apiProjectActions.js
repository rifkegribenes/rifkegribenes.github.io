import { RSAA } from "redux-api-middleware";
import BASE_URL from "./apiConfig.js";

export const GET_FEATURED_PROJECTS_REQUEST = "GET_FEATURED_PROJECTS_REQUEST";
export const GET_FEATURED_PROJECTS_SUCCESS = "GET_FEATURED_PROJECTS_SUCCESS";
export const GET_FEATURED_PROJECTS_FAILURE = "GET_FEATURED_PROJECTS_FAILURE";
export const GET_MORE_PROJECTS_REQUEST = "GET_MORE_PROJECTS_REQUEST";
export const GET_MORE_PROJECTS_SUCCESS = "GET_MORE_PROJECTS_SUCCESS";
export const GET_MORE_PROJECTS_FAILURE = "GET_MORE_PROJECTS_FAILURE";
export const GET_PROJECT_BY_ID_REQUEST = "GET_PROJECT_BY_ID_REQUEST";
export const GET_PROJECT_BY_ID_SUCCESS = "GET_PROJECT_BY_ID_SUCCESS";
export const GET_PROJECT_BY_ID_FAILURE = "GET_PROJECT_BY_ID_FAILURE";
export const ADD_PROJECT_REQUEST = "ADD_PROJECT_REQUEST";
export const ADD_PROJECT_SUCCESS = "ADD_PROJECT_SUCCESS";
export const ADD_PROJECT_FAILURE = "ADD_PROJECT_FAILURE";
export const DELETE_PROJECT_REQUEST = "DELETE_PROJECT_REQUEST";
export const DELETE_PROJECT_SUCCESS = "DELETE_PROJECT_SUCCESS";
export const DELETE_PROJECT_FAILURE = "DELETE_PROJECT_FAILURE";
export const UPDATE_PROJECT_REQUEST = "UPDATE_PROJECT_REQUEST";
export const UPDATE_PROJECT_SUCCESS = "UPDATE_PROJECT_SUCCESS";
export const UPDATE_PROJECT_FAILURE = "UPDATE_PROJECT_FAILURE";
export const HANDLE_INPUT = "HANDLE_INPUT";
export const HANDLE_SWITCH = "HANDLE_SWITCH";
export const HANDLE_DELETE_OPEN = "HANDLE_DELETE_OPEN";
export const HANDLE_DELETE_CLOSE = "HANDLE_DELETE_CLOSE";
export const CLEAR_FORM = "CLEAR_FORM";
export const SET_EDIT_PROJECT = "SET_EDIT_PROJECT";

export function handleInput({ target: { name, value } }) {
  return {
    type: HANDLE_INPUT,
    payload: { name, value }
  };
}

export function handleSwitch(name, value) {
  return {
    type: HANDLE_SWITCH,
    payload: { name, value }
  };
}

export function handleDeleteOpen(selectedProject) {
  return {
    type: HANDLE_DELETE_OPEN,
    payload: { selectedProject }
  };
}

export function handleDeleteClose() {
  return {
    type: HANDLE_DELETE_CLOSE
  };
}

export function clearForm() {
  return {
    type: CLEAR_FORM
  };
}

export function setEditProject(project) {
  return {
    type: SET_EDIT_PROJECT,
    payload: project
  };
}

/*
* Function: getFeaturedProjects -- return featured projects
* This action dispatches additional actions as it executes:
*   GET_FEATURED_PROJECTS_REQUEST:
*     Initiates spinner
*   GET_FEATURED_PROJECTS_SUCCESS:
*     If projects array successfully retrieved, hides spinner
*   GET_FEATURED_PROJECTS_FAILURE:
*     If database error, hides spinner, displays error toastr
*/
export function getFeaturedProjects() {
  return {
    [RSAA]: {
      endpoint: `${BASE_URL}/api/project?s=featured`,
      method: "GET",
      types: [
        GET_FEATURED_PROJECTS_REQUEST,
        GET_FEATURED_PROJECTS_SUCCESS,
        {
          type: GET_FEATURED_PROJECTS_FAILURE,
          payload: (action, state, res) => {
            return res.json().then(data => {
              let message = "Sorry, something went wrong :(";
              if (data) {
                if (data.message) {
                  message = data.message;
                }
                return { message };
              } else {
                return { message };
              }
            });
          }
        }
      ]
    }
  };
}

/*
* Function: getMoreProjects -- return unfeatured projects
* This action dispatches additional actions as it executes:
*   GET_MORE_PROJECTS_REQUEST:
*     Initiates spinner
*   GET_MORE_PROJECTS_SUCCESS:
*     If projects array successfully retrieved, hides spinner
*   GET_MORE_PROJECTS_FAILURE:
*     If database error, hides spinner, displays error toastr
*/
export function getMoreProjects() {
  return {
    [RSAA]: {
      endpoint: `${BASE_URL}/api/project?s=more`,
      method: "GET",
      types: [
        GET_MORE_PROJECTS_REQUEST,
        GET_MORE_PROJECTS_SUCCESS,
        {
          type: GET_MORE_PROJECTS_FAILURE,
          payload: (action, state, res) => {
            return res.json().then(data => {
              let message = "Sorry, something went wrong :(";
              if (data) {
                if (data.message) {
                  message = data.message;
                }
                return { message };
              } else {
                return { message };
              }
            });
          }
        }
      ]
    }
  };
}

/*
* Function: getProjectById -- get a single project by id
* @param {string} id
* This action dispatches additional actions as it executes:
*   GET_PROJECT_BY_ID_REQUEST:
*     Initiates a spinner on the home page.
*   GET_PROJECT_BY_ID_SUCCESS:
*     If project successfully retrieved, hides spinner
*   GET_PROJECT_BY_ID_FAILURE:
*     If database error, hides spinner, displays error toastr
*/
export function getProjectById(id) {
  return {
    [RSAA]: {
      endpoint: `${BASE_URL}/api/project/${id}`,
      method: "GET",
      types: [
        GET_PROJECT_BY_ID_REQUEST,
        GET_PROJECT_BY_ID_SUCCESS,
        {
          type: GET_PROJECT_BY_ID_FAILURE,
          payload: (action, state, res) => {
            return res.json().then(data => {
              let message = "Sorry, something went wrong :(";
              if (data) {
                if (data.message) {
                  message = data.message;
                }
                return { message };
              } else {
                return { message };
              }
            });
          }
        }
      ]
    }
  };
}

/*
* Function: addProject -- add new project to db
* @param {object} body (project object)
*  --  @param {string} title,
*  --  @param {string} body,
*  --  @param {string} screenshot_url,
*  --  @param {string} github_url,
*  --  @param {string} live_url
*  --  @param {array}  tag_names {string}
* This action dispatches additional actions as it executes:
*   ADD_PROJECT_REQUEST:
*     Initiates a spinner on the home page.
*   ADD_PROJECT_SUCCESS:
*     If project successfully retrieved, hides spinner
*   ADD_PROJECT_FAILURE:
*     If database error, hides spinner, displays error toastr
*/
export function addProject(token, body) {
  return {
    [RSAA]: {
      endpoint: `${BASE_URL}/api/project/`,
      method: "POST",
      types: [
        ADD_PROJECT_REQUEST,
        ADD_PROJECT_SUCCESS,
        {
          type: ADD_PROJECT_FAILURE,
          payload: (action, state, res) => {
            return res.json().then(data => {
              let message = "Sorry, something went wrong :(";
              if (data) {
                if (data.message) {
                  message = data.message;
                }
                return { message };
              } else {
                return { message };
              }
            });
          }
        }
      ],
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
  };
}

/*
* Function: updateProject -- update existing project
* @param {string} id project id
* @param {object} body (project object)
*  --  @param {object} updates
*  --  -- @param {string} title,
*  --  -- @param {string} body,
*  --  -- @param {string} screenshot_url,
*  --  -- @param {string} github_url,
*  --  -- @param {string} live_url
*  --  @param {array}  tag_names {string}
* This action dispatches additional actions as it executes:
*   UDPATE_PROJECT_REQUEST:
*     Initiates a spinner on the home page.
*   UDPATE_PROJECT_SUCCESS:
*     If project successfully updated, hides spinner
*   UDPATE_PROJECT_FAILURE:
*     If database error, hides spinner, displays error toastr
*/
export function updateProject(token, id, body) {
  return {
    [RSAA]: {
      endpoint: `${BASE_URL}/api/project/${id}`,
      method: "PUT",
      types: [
        UPDATE_PROJECT_REQUEST,
        UPDATE_PROJECT_SUCCESS,
        {
          type: UPDATE_PROJECT_FAILURE,
          payload: (action, state, res) => {
            return res.json().then(data => {
              let message = "Sorry, something went wrong :(";
              if (data) {
                if (data.message) {
                  message = data.message;
                }
                return { message };
              } else {
                return { message };
              }
            });
          }
        }
      ],
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
  };
}

/*
* Function: removeProject -- remove project from database
* @param {string} id
* This action dispatches additional actions as it executes:
*   REMOVE_PROJECT_REQUEST:
*     Initiates a spinner on the home page.
*   REMOVE_PROJECT_SUCCESS:
*     If project successfully removed, hides spinner
*   REMOVE_PROJECT_FAILURE:
*     If database error, hides spinner, displays error toastr
*/
export function deleteProject(token, id) {
  return {
    [RSAA]: {
      endpoint: `${BASE_URL}/api/project/${id}`,
      method: "DELETE",
      types: [
        DELETE_PROJECT_REQUEST,
        DELETE_PROJECT_SUCCESS,
        {
          type: DELETE_PROJECT_FAILURE,
          payload: (action, state, res) => {
            return res.json().then(data => {
              let message = "Sorry, something went wrong :(";
              if (data) {
                if (data.message) {
                  message = data.message;
                }
                return { message };
              } else {
                return { message };
              }
            });
          }
        }
      ],
      headers: { Authorization: `Bearer ${token}` }
    }
  };
}
