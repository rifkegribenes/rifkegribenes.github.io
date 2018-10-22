const passport = require('passport');
const { db, TABLES } = require('./knex');

const user = {
	serialize: (user, done) => {
		console.log('app/config/auth.js > 6');
		console.log(user);
		console.log('app/config/auth.js > 8');
		console.log(done);
		done(null, user.id);
	},

	deserialize: (id, done) => {
	  db(TABLES.USERS).where({id}).first()
	  .then((user) => { done(null, user); })
	  .catch((err) => { done(err, null); });
	}
}

const githubAuth = {
		'clientID': process.env.GITHUB_KEY,
		'clientSecret': process.env.GITHUB_SECRET,
		'callbackURL': `${process.env.SERVER_URL}/api/auth/github/callback`
	}

module.exports = { user, githubAuth }