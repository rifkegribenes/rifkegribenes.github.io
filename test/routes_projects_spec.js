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
const tag_names = [tagName];
const tag_names2 = [tagName2];
const title = `new project ${utils.randomText()}`;
const title2 = `new project2 ${utils.randomText()}`;
const body = "new project body text";
const screenshot_url = "http://example.com/screenshot.png";
const live_url = "http://example.com";
const github_url = "http://github.com/rifkegribenes";

const updatedTitle = `updated project ${utils.randomText()}`;
const updatedBody = "updated project body text";
const updatedTagName = "updated tag from controller";
const updatedScreenshotUrl = "http://example.com/updated-screenshot.png";
const updatedLiveUrl = "http://example.com/update";
const updatedGithubUrl = "http://github.com/rifkegribenes/update";
const updatedTags = [tagName, updatedTagName];

let id;
let id2;

/* ================================= TESTS ================================= */

chai.use(chaiHttp);

suite("routes : projects", function() {
  suite("POST /api/projects/", function() {
    test("creates and returns new project", function(done) {
      chai
        .request(app)
        .post("/api/projects/")
        .send({ title, body, screenshot_url, live_url, github_url, tag_names })
        .end(function(err, res) {
          console.log("routes_projects_spec : res.body");
          console.log(res.body);
          id = res.body.id;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.include(res.body, {
            title,
            body,
            screenshot_url,
            live_url,
            github_url,
            tag_names
          });
          assert.isNull(err);
          done();
        });
    });

    test("returns an error if payload is malformed", function(done) {
      chai
        .request(app)
        .post("/api/projects/")
        .send({ name: "project" })
        .end(function(err, res) {
          id = res.body.id;
          assert.equal(res.status, 400);
          assert.equal(res.type, "application/json");
          assert.isNotNull(err);
          assert.isNotNull(res.body.message);
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
