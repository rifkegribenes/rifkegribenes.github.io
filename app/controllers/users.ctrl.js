/*
   Route handlers for fetching and updating users.
*/

/* ================================= SETUP ================================= */

// import model and mail utilities
const users = require("../../db/models/users");
const mailUtils = require("../utils/mailUtils");

/* ============================ ROUTE HANDLERS ============================= */

/** Create a new user
 *  @param    {String}   username        Username from github profile.
 *  @param    {String}   email           Email from github profile.
 *  @param    {String}   github_id       Github unique ID.
 *  @param    {String}   github_token    Github auth token.
 *  @returns  {Object}                   New user object OR error message.
 */
const createUser = (req, res, next) => {
  const { username, email, github_id, github_token } = req.body;
  if (username === "rifkegribenes" && email === "rifkegribenes@gmail.com") {
    // don't create any other users
    return users
      .createUser(username, email, github_id, github_token)
      .then(users => {
        const user = users[0];
        res.status(200).json(user);
      })
      .catch(err => {
        console.log(`users.ctrl.js > 31: ${err}`);
        res.status(500).json({ message: err.message });
      });
  } else {
    return res
      .status(500)
      .json({ message: "There was an error creating the user account" });
  }
};

/** Update an existing user
 *  @param    {String}   id              Id of user to update.
 *  @param    {Object}   updates         Key/value pairs for fields to update.
 ****  @param    {String}   username        Updated username.
 ****  @param    {String}   email           Updated email.
 *  @returns  {Object}                   Updated user object OR error message.
 */
const updateUser = (req, res, next) => {
  const { updates } = req.body;
  const { id } = req.params;
  if (!updates || !Object.keys(updates).length) {
    return res.status(404).json({ message: "No updates submitted" });
  }

  return users
    .updateUser(id, updates)
    .then(user => {
      if (user.message || !user) {
        return res.status(404).json({
          message:
            user.message || "An error occured while trying to update this user"
        });
      } else {
        return res.status(200).json(user);
      }
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

/** Delete user
 *  @param    {String}   id   Id of the user to delete.
 *  @returns  Success or error message.
 */
const deleteUser = (req, res, next) => {
  return users
    .deleteUser(req.params.id)
    .then(result => {
      if (result.message === "User deleted successfully") {
        return res.status(200).json({ message: result.message });
      } else {
        return res.status(404).json({
          message: "An error occurred and the user was not deleted."
        });
      }
    })
    .catch(err => res.status(404).json({ message: err.message }));
};

/** Get all users
 *  @returns  {Array|Object}   Array of user objects OR error message
 */
const getUsers = () => {
  return users
    .getUsers()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(404).json({ message: err.message }));
};

/** Get one user
 *  @param    {String}   id   Id of the requested user.
 *  @returns  {Object}        User object OR error message.
 */
const getUserById = (req, res, next) => {
  return users
    .getUserById(req.params.id)
    .then(user => {
      if (!user || user.message) {
        return res
          .status(404)
          .json({ message: user.message || "User not found" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => res.status(404).json({ message: err.message }));
};

/** Send an email
 *  @param    {String}   id   Id of the requested user.
 *  @returns  {Object}        User object OR error message.
 */
const sendEmail = (req, res, next) => {
  const { name, fromEmail, subject, message } = req.body;
  const html = `<div>${message}</div>`;
  mailUtils
    .sendMail(name, fromEmail, subject, html, message)
    .then(() => {
      console.log("email sent (users.ctrl.js > 129)");
      return res.status(200).json({ message: "Email sent successfully" });
    })
    .catch(err => res.status(404).json({ message: err.message }));
};

/* ================================ EXPORT ================================= */

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUsers,
  sendEmail
};
