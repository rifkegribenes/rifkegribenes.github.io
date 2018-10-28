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
 *  @returns  {Object}                   New user object.
 */
const createUser = (username, email, github_id, github_token) => {
  if (username && email) {
    // since mine is the only user account i want authorized to use this app,
    // only allow it to create a user with my username
    // if (username === "rifkegribenes" && email === "rifkegribenes@gmail.com") {
    return users.createUser(username, email, github_id, github_token);
  } else {
    return { message: "You are not authorized to create a user account" };
  }
};

/** Update an existing user
 *  @param    {String}   id              Id of user to update.
 *  @param    {Object}   updates         Key/value pairs for fields to update.
 ****  @param    {String}   username        Updated username.
 ****  @param    {String}   email           Updated email.
 *  @returns  {Object}                   Updated user object.
 */
const updateUser = (id, updates) => {
  return users.updateUser(id, updates);
};

/** Delete user
 *  @param    {String}   id   Id of the user to delete.
 *  @returns  Success message or error.
 */
const deleteUser = id => {
  return users.deleteUser(id);
};

/** Get all users
 *  @returns  {Array}   Array of user objects
 */
const getUsers = () => {
  return users.getUsers();
};

/** Get one user
 *  @param    {String}   id   Id of the requested user.
 *  @returns  {Object}        User object.
 */
const getUserById = id => {
  return users.getUserById(id);
};

/* ================================ EXPORT ================================= */

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUsers
};
