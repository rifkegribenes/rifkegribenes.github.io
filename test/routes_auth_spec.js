// test/auth_spec.js
/* globals describe afterEach it beforeEach */

/* ================================= SETUP ================================= */

process.env.NODE_ENV = "testing";

const chai = require("chai");
const { db, TABLES } = require("../app/config/knex");
const { assert } = chai;
const chaiHttp = require("chai-http");
const { suite, test } = require("mocha");
const app = require("../server");
const utils = require("../app/utils");

// const knex = require('../../src/server/db/connection');

/* ================================= TESTS ================================= */

describe("routes : auth", () => {
  beforeEach(() => {
    return db.migrate.rollback().then(() => {
      return db.migrate.latest();
    });
  });

  afterEach(() => {
    return db.migrate.rollback();
  });
});
