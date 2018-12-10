import update from "immutability-helper";

import { LOGOUT } from "../actions";
import {
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
  HANDLE_INPUT,
  CLEAR_FORM
} from "../actions/apiContactActions";

const INITIAL_STATE = {
  loading: false,
  form: {
    name: "",
    fromEmail: "",
    subject: "",
    message: ""
  },
  error: null
};

function contact(state = INITIAL_STATE, action) {
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

    case CLEAR_FORM:
      return update(state, {
        form: {
          name: { $set: "" },
          fromEmail: { $set: "" },
          subject: { $set: "" },
          message: { $set: "" }
        }
      });

    case SEND_EMAIL_REQUEST:
      return update(state, {
        loading: { $set: true },
        error: { $set: null }
      });

    case SEND_EMAIL_SUCCESS:
      return update(state, {
        loading: { $set: false },
        error: { $set: null }
      });

    case SEND_EMAIL_FAILURE:
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

export default contact;
