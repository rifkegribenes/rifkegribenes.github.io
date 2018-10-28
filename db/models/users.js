// db/models/users.js

/* ================================= SETUP ================================= */

const uuid = require("uuid");
const { db, TABLES } = require("../../app/config/knex");

/* ============================ PUBLIC METHODS ============================= */

/** Create a user
 *  @param    {String}   username       New user username.
 *  @param    {String}   email          New user email.
 *  @param    {String}   github_id      New user github id.
 *  @param    {String}   github_token   New user github token.
 *  @returns  {Array}    Array of 1 newly-created User object.
 */
const createUser = (username, email, github_id, github_token) => {
  return db
    .insert({ id: uuid.v4(), username, email, github_id, github_token })
    .into(TABLES.USERS)
    .returning("*");
};

/** Find a user by id
 *  @param    {String}   id   The id of the user we want.
 *  @returns  {Object}        User object.
 */

const getUserById = id => {
  return db(TABLES.USERS)
    .where({ id })
    .first()
    .returning("*");
};

/* ================================ exports ================================ */

module.exports = {
  createUser,
  getUserById
};
