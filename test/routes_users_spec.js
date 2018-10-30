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
  suite("POST /api/users/", function() {
    test("creates and returns new user", function(done) {
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
    test("returns an error if request body is malformed", function(done) {
      chai
        .request(app)
        .post("/api/users/")
        .send({ name: "user" })
        .end(function(err, res) {
          assert.equal(res.status, 500);
          assert.equal(res.type, "application/json");
          assert.isNotNull(res.body.message);
          done();
        });
    });
  });

  suite("GET /api/users/:id", function() {
    test("gets one user by id", function(done) {
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
    test("returns error if user id missing or malformed", function(done) {
      chai
        .request(app)
        .get("/api/users/123456789")
        .end(function(err, res) {
          assert.equal(res.status, 404);
          assert.equal(res.type, "application/json");
          assert.isNotNull(res.body.message);
          done();
        });
    });
  });

  suite("PUT /api/users/:id", function() {
    test("updates a user", function(done) {
      const updates = {
        email: updatedEmail,
        username: updatedUsername
      };
      chai
        .request(app)
        .put(`/api/users/${userId}`)
        .send({ updates })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isNull(err);
          assert.property(res.body[0], "id");
          assert.property(res.body[0], "created_at");
          assert.property(res.body[0], "updated_at");
          assert.property(res.body[0], "email");
          assert.property(res.body[0], "username");
          assert.property(res.body[0], "github_id");
          assert.property(res.body[0], "github_token");
          done();
        });
    });
    test("returns error if user id missing or malformed", function(done) {
      const updates = {
        email: updatedEmail,
        username: updatedUsername
      };
      chai
        .request(app)
        .put("/api/users/123456789")
        .send({ updates })
        .end(function(err, res) {
          assert.equal(res.status, 500);
          assert.equal(res.type, "application/json");
          assert.isNotNull(res.body.message);
          done();
        });
    });
    test("returns error if updates missing or malformed", function(done) {
      chai
        .request(app)
        .put(`/api/users/${userId}`)
        .send({ name: undefined })
        .end(function(err, res) {
          assert.equal(res.status, 404);
          assert.equal(res.type, "application/json");
          assert.isNotNull(res.body.message);
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
    test("returns error if user id missing or malformed", function(done) {
      chai
        .request(app)
        .delete("/api/users/123456789")
        .end(function(err, res) {
          assert.equal(res.status, 404);
          assert.equal(res.type, "application/json");
          assert.isNotNull(res.body.message);
          done();
        });
    });
  });
});
