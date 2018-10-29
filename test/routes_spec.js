// test/routes_spec.js
/* globals describe afterEach it beforeEach */

/* ================================= SETUP ================================= */

process.env.NODE_ENV = "testing";

const chai = require("chai");
const { assert } = chai;
const chaiHttp = require("chai-http");
const { suite, test } = require("mocha");
const app = require("../server");
const utils = require("../app/utils");

const tagName = `new tag ${utils.randomText()}`;
const tagName2 = `new tag ${utils.randomText()}`;
const tagNames = [tagName];
const tagNames2 = [tagName2];
const title = `new project ${utils.randomText()}`;
const title2 = `new project2 ${utils.randomText()}`;
const body = "new project body text";
const screenshotUrl = "http://example.com/screenshot.png";
const liveUrl = "http://example.com";
const githubUrl = "http://github.com/rifkegribenes";

const updatedTitle = `updated project ${utils.randomText()}`;
const updatedBody = "updated project body text";
const updatedTagName = "updated tag from controller";
const updatedScreenshotUrl = "http://example.com/updated-screenshot.png";
const updatedLiveUrl = "http://example.com/update";
const updatedGithubUrl = "http://github.com/rifkegribenes/update";
const updatedTags = [tagName, updatedTagName];

const username = "testUserName";
const email = "test@email.com";
const updatedUsername = "updatedUsername";
const updatedEmail = "updatedEmail@email.com";
const github_id = "1234";
const github_token = "5678";

let id;
let id2;
let userId;

/* ================================= TESTS ================================= */

chai.use(chaiHttp);

suite("Functional Tests", function() {
  suite("API ROUTING FOR /api/projects/", function() {
    suite("POST", function() {
      test("create 2 new projects", function(done) {
        chai
          .request(app)
          .post("/api/projects/")
          .send({ title, body, screenshotUrl, liveUrl, githubUrl, tagNames })
          .end(function(err, res) {
            id = res.body.id;
            assert.equal(res.status, 200);
            assert.isNull(err);
          });
        chai
          .request(app)
          .post("/api/projects/")
          .send({
            title: title2,
            body,
            screenshotUrl,
            liveUrl,
            githubUrl,
            tagNames: tagNames2
          })
          .end(function(err, res) {
            id2 = res.body.id;
            assert.equal(res.status, 200);
            assert.isNull(err);
            done();
          });
      });
    });

    suite("GET", function() {
      test("get all projects", function(done) {
        chai
          .request(app)
          .get("/api/projects")
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isNull(err);
            assert.isArray(res.body);
            assert.property(res.body[0], "id");
            assert.property(res.body[0], "created_at");
            assert.property(res.body[0], "updated_at");
            assert.property(res.body[0], "title");
            assert.property(res.body[0], "body");
            assert.property(res.body[0], "screenshot_url");
            assert.property(res.body[0], "live_url");
            assert.property(res.body[0], "github_url");
            assert.isArray(res.body[0].tags);
            done();
          });
      });

      test("get one project by id", function(done) {
        chai
          .request(app)
          .get(`/api/projects/${id}`)
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isNull(err);
            assert.property(res.body, "id");
            assert.property(res.body, "created_at");
            assert.property(res.body, "updated_at");
            assert.property(res.body, "title");
            assert.property(res.body, "body");
            assert.property(res.body, "screenshot_url");
            assert.property(res.body, "live_url");
            assert.property(res.body, "github_url");
            assert.isArray(res.body.tags);
            done();
          });
      });
    });

    suite("PUT", function() {
      test("update a project", function(done) {
        const updates = {
          title: updatedTitle,
          body: updatedBody,
          screenshot_url: updatedScreenshotUrl,
          live_url: updatedLiveUrl,
          github_url: updatedGithubUrl
        };
        chai
          .request(app)
          .get(`/api/projects/${id}`)
          .send({ updates, tags: updatedTags })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isNull(err);
            assert.property(res.body, "id");
            assert.property(res.body, "created_at");
            assert.property(res.body, "updated_at");
            assert.property(res.body, "title");
            assert.property(res.body, "body");
            assert.property(res.body, "screenshot_url");
            assert.property(res.body, "live_url");
            assert.property(res.body, "github_url");
            assert.isArray(res.body.tags);
            done();
          });
      });
    });

    suite("DELETE", function() {
      test("delete a project", function(done) {
        chai
          .request(app)
          .delete(`/api/projects/${id}`)
          .end(function(err, res) {
            assert.equal(res.body.message, "Project deleted successfully");
            assert.isNull(err);
            done();
          });
      });
    });
  });

  suite("API ROUTING FOR /api/users/", function() {
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
});
