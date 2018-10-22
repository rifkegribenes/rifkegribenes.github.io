const passport = require('passport');
const knex = require('./db/connection');

const user = {
	serialize: (user, done) => { done(null, user.id); },

	deserialize: (id, done) => {
	  return knex('users').where({id}).first()
	  .then((user) => { done(null, user); })
	  .catch((err) => { done(err, null); });
	}
}

module.exports = user;