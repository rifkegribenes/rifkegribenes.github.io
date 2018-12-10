import { RSAA } from "redux-api-middleware";
import BASE_URL from "./apiConfig.js";

export const SEND_EMAIL_REQUEST = "SEND_EMAIL_REQUEST";
export const SEND_EMAIL_SUCCESS = "SEND_EMAIL_SUCCESS";
export const SEND_EMAIL_FAILURE = "SEND_EMAIL_FAILURE";
export const HANDLE_INPUT = "HANDLE_INPUT";
export const CLEAR_FORM = "CLEAR_FORM";

export function handleInput({ target: { name, value } }) {
  return {
    type: HANDLE_INPUT,
    payload: { name, value }
  };
}

export function clearForm() {
  return {
    type: CLEAR_FORM
  };
}

/*
* Function: sendEmail -- send message using nodemailer
* @param {object} body (message object)
*  --  @param {string} name,
*  --  @param {string} fromEmail,
*  --  @param {string} subject,
*  --  @param {string} message
* This action dispatches additional actions as it executes:
*   SEND_EMAIL_REQUEST:
*     Initiates a spinner on the home page.
*   SEND_EMAIL_SUCCESS:
*     If message successfully sent, hides spinner
*   SEND_EMAIL_FAILURE:
*     If database error, hides spinner, displays error toastr
*/
export function sendEmail(body) {
  return {
    [RSAA]: {
      endpoint: `${BASE_URL}/api/contact/`,
      method: "POST",
      types: [
        SEND_EMAIL_REQUEST,
        SEND_EMAIL_SUCCESS,
        {
          type: SEND_EMAIL_FAILURE,
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
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
  };
}
