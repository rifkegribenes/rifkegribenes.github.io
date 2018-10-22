'use strict';

module.exports = {
  'url' : process.env.POSTGRES_URL,
  // options: {
		// keepAlive: 1,
		// connectTimeoutMS: 30000,
		// reconnectTries: Number.MAX_VALUE,
		// reconnectInterval: 1000,
		// useNewUrlParser: true
		// }
};

const pg = require('knex')({
  client: 'pg',
  connection: process.env.POSTGRES_URL,
  searchPath: ['knex', 'public'],
});
