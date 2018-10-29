/*
   Route handlers for fetching and updating users.
*/

/* ================================= SETUP ================================= */

// import model
const users = require("../../db/models/users");

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
  if (username && email) {
    // since mine is the only user account i want authorized to use this app,
    // only allow it to create a user with my username
    // if (username === "rifkegribenes" && email === "rifkegribenes@gmail.com") {
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
    return { message: "You are not authorized to create a user account" };
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
  return users
    .updateUser(id, updates)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ message: err.message }));
};

/** Delete user
 *  @param    {String}   id   Id of the user to delete.
 *  @returns  Success or error message.
 */
const deleteUser = (req, res, next) => {
  return users
    .deleteUser(req.params.id)
    .then(() => res.status(200).json({ message: "User deleted successfully" }))
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
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json({ message: err.message }));
};

/* ================================ EXPORT ================================= */

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUsers
};
