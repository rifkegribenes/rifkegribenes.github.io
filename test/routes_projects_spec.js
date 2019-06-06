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
const title3 = `new project3 ${utils.randomText()}`;
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
const updatedTags2 = ["totallyDifferentTagName"];

let id;
let id2;

/* ================================= TESTS ================================= */

chai.use(chaiHttp);

suite("routes : project", function() {
  suite("POST /api/project/", function() {
    test("creates and returns new project", function(done) {
      chai
        .request(app)
        .post("/api/project/")
        .send({
          title,
          body,
          screenshot_url,
          live_url,
          github_url,
          tag_names,
          featured: false,
          sort_order: 1
        })
        .end(function(err, res) {
          id = res.body[0].id;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.property(res.body[0], "id");
          assert.property(res.body[0], "created_at");
          assert.property(res.body[0], "updated_at");
          assert.property(res.body[0], "title");
          assert.property(res.body[0], "body");
          assert.property(res.body[0], "screenshot_url");
          assert.property(res.body[0], "live_url");
          assert.property(res.body[0], "github_url");
          assert.property(res.body[0], "tag_names");
          assert.property(res.body[0], "featured");
          assert.property(res.body[0], "sort_order");
          assert.isArray(res.body[0].tag_names);
          assert.equal(res.body[0].tag_names.length, 1);
          assert.isNull(err);
          done();
        });
    });

    test("creates and returns featured project", function(done) {
      chai
        .request(app)
        .post("/api/project/")
        .send({
          title: title3,
          body,
          screenshot_url,
          live_url,
          github_url,
          tag_names,
          featured: true,
          sort_order: 1
        })
        .end(function(err, res) {
          if (err) {
            console.log(`77: ${err}`);
          }
          console.log(res.body);
          id = res.body[0].id;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.property(res.body[0], "id");
          assert.property(res.body[0], "created_at");
          assert.property(res.body[0], "updated_at");
          assert.property(res.body[0], "title");
          assert.property(res.body[0], "body");
          assert.property(res.body[0], "screenshot_url");
          assert.property(res.body[0], "live_url");
          assert.property(res.body[0], "github_url");
          assert.property(res.body[0], "tag_names");
          assert.property(res.body[0], "featured");
          assert.property(res.body[0], "sort_order");
          assert.isArray(res.body[0].tag_names);
          assert.equal(res.body[0].tag_names.length, 1);
          assert.equal(res.body[0].featured, true);
          assert.isNull(err);
          done();
        });
    });

    test("returns an error if request body is malformed", function(done) {
      chai
        .request(app)
        .post("/api/project/")
        .send({ name: "project" })
        .end(function(err, res) {
          assert.equal(res.status, 500);
          assert.equal(res.type, "application/json");
          assert.isNotNull(res.body.message);
          done();
        });
    });
  });

  suite("GET /api/project/", function() {
    test("gets all projects", function(done) {
      chai
        .request(app)
        .get("/api/project")
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
          assert.property(res.body[0], "tag_names");
          assert.property(res.body[0], "featured");
          assert.property(res.body[0], "sort_order");
          assert.isArray(res.body[0].tag_names);
          done();
        });
    });
  });

  suite("GET /api/project?s=featured", function() {
    test("gets featured projects", function(done) {
      chai
        .request(app)
        .get("/api/project?s=featured")
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
          assert.property(res.body[0], "tag_names");
          assert.property(res.body[0], "featured");
          assert.property(res.body[0], "sort_order");
          assert.isArray(res.body[0].tag_names);
          assert.equal(res.body[0].featured, true);
          done();
        });
    });
  });

  suite("GET /api/project?s=more", function() {
    test("gets unfeatured ('more') projects", function(done) {
      chai
        .request(app)
        .get("/api/project?s=more")
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
          assert.property(res.body[0], "tag_names");
          assert.property(res.body[0], "featured");
          assert.property(res.body[0], "sort_order");
          assert.isArray(res.body[0].tag_names);
          assert.equal(res.body[0].featured, false);
          done();
        });
    });
  });

  suite("GET /api/project/:id", function() {
    test("get one project by id", function(done) {
      chai
        .request(app)
        .get(`/api/project/${id}`)
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isNull(err);
          assert.property(res.body[0], "id");
          assert.property(res.body[0], "created_at");
          assert.property(res.body[0], "updated_at");
          assert.property(res.body[0], "title");
          assert.property(res.body[0], "body");
          assert.property(res.body[0], "screenshot_url");
          assert.property(res.body[0], "live_url");
          assert.property(res.body[0], "github_url");
          assert.isArray(res.body[0].tag_names);
          done();
        });
    });

    test("returns error if project id missing or malformed", function(done) {
      chai
        .request(app)
        .get("/api/project/123456789")
        .end(function(err, res) {
          assert.equal(res.status, 404);
          assert.equal(res.type, "application/json");
          assert.isNotNull(res.body.message);
          done();
        });
    });
  });

  suite("PUT /api/project/:id", function() {
    test("updates a project and adds tags", function(done) {
      const updates = {
        title: updatedTitle,
        body: updatedBody,
        screenshot_url: updatedScreenshotUrl,
        live_url: updatedLiveUrl,
        github_url: updatedGithubUrl
      };
      chai
        .request(app)
        .put(`/api/project/${id}`)
        .send({ updates, tag_names: updatedTags })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isNull(err);
          assert.property(res.body[0], "id");
          assert.property(res.body[0], "created_at");
          assert.property(res.body[0], "updated_at");
          assert.property(res.body[0], "title");
          assert.property(res.body[0], "body");
          assert.property(res.body[0], "screenshot_url");
          assert.property(res.body[0], "live_url");
          assert.property(res.body[0], "github_url");
          assert.isArray(res.body[0].tag_names);
          assert.include(res.body[0].tag_names, updatedTagName);
          done();
        });
    });
    test("updates a project and removes tags", function(done) {
      const updates = {
        title: updatedTitle,
        body: updatedBody,
        screenshot_url: updatedScreenshotUrl,
        live_url: updatedLiveUrl,
        github_url: updatedGithubUrl
      };
      chai
        .request(app)
        .put(`/api/project/${id}`)
        .send({ updates, tag_names: updatedTags2 })
        .end(function(err, res) {
          console.log("routes_projects_spec.js > 292");
          console.log(res.body[0]);
          console.log(res.body[0].tag_names);
          assert.equal(res.status, 200);
          assert.isNull(err);
          assert.property(res.body[0], "id");
          assert.property(res.body[0], "created_at");
          assert.property(res.body[0], "updated_at");
          assert.property(res.body[0], "title");
          assert.property(res.body[0], "body");
          assert.property(res.body[0], "screenshot_url");
          assert.property(res.body[0], "live_url");
          assert.property(res.body[0], "github_url");
          assert.isArray(res.body[0].tag_names);
          assert.include(res.body[0].tag_names, "totallyDifferentTagName");
          console.log(`routes_projects_spec.js > 307`);
          console.log(res.body[0].tag_names);
          assert.notInclude(res.body[0].tag_names, updatedTagName);
          done();
        });
    });
    test("returns error if project id missing or malformed", function(done) {
      const updates = {
        title: updatedTitle,
        body: updatedBody,
        screenshot_url: updatedScreenshotUrl,
        live_url: updatedLiveUrl,
        github_url: updatedGithubUrl
      };
      chai
        .request(app)
        .put("/api/project/123456789")
        .send({ updates, tag_names: updatedTags })
        .end(function(err, res) {
          assert.equal(res.status, 404);
          assert.equal(res.type, "application/json");
          assert.isNotNull(res.body.message);
          done();
        });
    });
    test("returns error if updates missing or malformed", function(done) {
      chai
        .request(app)
        .put(`/api/project/${id}`)
        .send({ name: undefined })
        .end(function(err, res) {
          assert.equal(res.status, 404);
          assert.equal(res.type, "application/json");
          assert.isNotNull(res.body.message);
          done();
        });
    });
  });

  suite("DELETE /api/project/:id", function() {
    test("deletes a project", function(done) {
      chai
        .request(app)
        .delete(`/api/project/${id}`)
        .end(function(err, res) {
          assert.equal(res.body.message, "Project deleted successfully");
          assert.isNull(err);
          done();
        });
    });
    test("returns error if project id missing or malformed", function(done) {
      chai
        .request(app)
        .delete("/api/project/123456789")
        .end(function(err, res) {
          assert.equal(res.status, 404);
          assert.equal(res.type, "application/json");
          assert.isNotNull(res.body.message);
          done();
        });
    });
  });
});
