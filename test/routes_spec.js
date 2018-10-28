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
const tags = [tagName];
const tags2 = [tagName2];
console.log(`routes.spec.js > 19: tagName, tagName2: ${(tagName, tagName2)}`);
const title = `new project ${utils.randomText()}`;
const title2 = `new project2 ${utils.randomText()}`;
console.log(`routes.spec.js > 22: title, title2: ${(title, title2)}`);
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

/* ================================= TESTS ================================= */

chai.use(chaiHttp);

suite("Functional Tests", function() {
  suite("API ROUTING FOR /api/projects/", function() {
    suite("POST", function() {
      test("create new project", function(done) {
        chai
          .request(app)
          .post("/api/projects/")
          .send({ title, body, screenshotUrl, liveUrl, githubUrl, tags })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isNull(err);
            done();
          });
      });
    });
  });
});
