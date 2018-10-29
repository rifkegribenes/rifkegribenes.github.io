// test/routes_users_spec.js
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

const username = "testUserName";
const email = "test@email.com";
const updatedUsername = "updatedUsername";
const updatedEmail = "updatedEmail@email.com";
const github_id = "1234";
const github_token = "5678";

let id;
let id2;

/* ================================= TESTS ================================= */

chai.use(chaiHttp);

suite("routes : users", function() {
  suite("POST", function() {
    test("create new user", function(done) {
      chai
        .request(app)
        .post("/api/users/")
        .send({ username, email, github_id, github_token })
        .end(function(err, res) {
          userId = res.body.id;
          assert.equal(res.status, 200);
          assert.isNull(err);
          done();
        });
    });
  });

  suite("GET", function() {
    test("get one user by id", function(done) {
      chai
        .request(app)
        .get(`/api/users/${userId}`)
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isNull(err);
          assert.property(res.body, "id");
          assert.property(res.body, "created_at");
          assert.property(res.body, "updated_at");
          assert.property(res.body, "email");
          assert.property(res.body, "username");
          assert.property(res.body, "github_id");
          assert.property(res.body, "github_token");
          done();
        });
    });
  });

  suite("PUT", function() {
    test("update a user", function(done) {
      const updates = {
        email: updatedEmail,
        username: updatedUsername
      };
      chai
        .request(app)
        .get(`/api/users/${userId}`)
        .send({ updates })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isNull(err);
          assert.property(res.body, "id");
          assert.property(res.body, "created_at");
          assert.property(res.body, "updated_at");
          assert.property(res.body, "email");
          assert.property(res.body, "username");
          assert.property(res.body, "github_id");
          assert.property(res.body, "github_token");
          done();
        });
    });
  });

  suite("DELETE", function() {
    test("delete a user", function(done) {
      chai
        .request(app)
        .delete(`/api/users/${userId}`)
        .end(function(err, res) {
          assert.equal(res.body.message, "User deleted successfully");
          assert.isNull(err);
          done();
        });
    });
  });
});
