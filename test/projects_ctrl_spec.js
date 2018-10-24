// test/project_ctrl_spec.js
/* globals describe afterEach it beforeEach */

/* ================================= SETUP ================================= */

process.env.NODE_ENV = "testing";

const { assert } = require("chai");
const { db, TABLES } = require("../app/config/knex");
const projects = require("../db/models/projects");
const tags = require("../db/models/tags");
const controller = require("../app/controllers/projects.ctrl");

const tagName = "new tag";
const originalTags = [tagName];
const projectTitle = "new project";
const projectTitle2 = "new project2";
const projectBody = "new project body text";
const screenshotUrl = "http://example.com/screenshot.png";
const liveUrl = "http://example.com";
const githubUrl = "http://github.com/rifkegribenes";

const updatedProjectTitle = "updated project";
const updatedProjectBody = "updated project body text";
const updatedTagName = "updated tag from controller";
const updatedScreenshotUrl = "http://example.com/updated-screenshot.png";
const updatedLiveUrl = "http://example.com/update";
const updatedGithubUrl = "http://github.com/rifkegribenes/update";
const updatedTags = [tagName, updatedTagName];

/* ================================= TESTS ================================= */

describe("projects controller tests", () => {
  let projectId;
  let tagId;

  // create a tag and 2 projects
  beforeEach(() => {
    return (
      tags
        .createTag(tagName)
        .then(tag => (tagId = tag.id))
        .then(() => {
          return projects.createProject(
            projectTitle,
            projectBody,
            screenshotUrl,
            liveUrl,
            githubUrl
          );
        })
        .then(([project]) => (projectId = project.id))
        // attach the newly created tag to the project whose id we just stored
        .then(() => {
          return projects.attachProjectTag(projectId, tagId);
        })
        .then(() => {
          return projects.createProject(
            projectTitle2,
            projectBody,
            screenshotUrl,
            liveUrl,
            githubUrl
          );
        })
    );
  });

  afterEach(() => {
    return db(TABLES.PROJECTS_TAGS)
      .del()
      .then(() => db(TABLES.TAGS).del())
      .then(() => db(TABLES.PROJECTS).del());
  });

  it("POST creates a new project associated with a list of tags", () => {
    const newProjectTitle = "second project";
    const newProjectBody = "second project body text";
    const newTagName = "second tag";
    const tags = [tagName, newTagName];

    return controller
      .createProjectWithTags(
        newProjectTitle,
        newProjectBody,
        screenshotUrl,
        liveUrl,
        githubUrl,
        tags
      )
      .then(result => {
        assert.equal(result.title, newProjectTitle);
        assert.deepEqual(result.tags, tags);
        return db
          .select("*")
          .from(TABLES.TAGS)
          .where("tag", tagName);
      })
      .then(results => {
        assert.equal(results.length, 1);
      });
  });

  it("GET gets one project by id", () => {
    return controller.getProjectById(projectId).then(result => {
      assert.equal(result.title, projectTitle);
      assert.equal(result.body, projectBody);
      assert.equal(result.screenshot_url, screenshotUrl);
      assert.equal(result.live_url, liveUrl);
      assert.equal(result.github_url, githubUrl);
      assert.deepEqual(result.tags, [tagName]);
      assert.typeOf(result.tags, "array");
    });
  });

  it("PUT updates a project with tags", () => {
    const updates = {
      title: updatedProjectTitle,
      body: updatedProjectBody,
      screenshot_url: updatedScreenshotUrl,
      live_url: updatedLiveUrl,
      github_url: updatedGithubUrl
    };

    return controller
      .updateProjectWithTags(projectId, updates, updatedTags)
      .then(result => {
        console.log("projects_ctrl_spec.js > 126");
        console.log(result);
        // the updated project should contain all tags included in the updates
        //  plus any pre-existing tags
        const concatenatedTags = [...originalTags, ...updatedTags];
        console.log("concatenatedTags:");
        console.log(concatenatedTags);
        assert.equal(result.title, updatedProjectTitle);
        assert.equal(result.body, updatedProjectBody);
        assert.equal(result.screenshot_url, updatedScreenshotUrl);
        assert.equal(result.live_url, updatedLiveUrl);
        assert.equal(result.github_url, updatedGithubUrl);
        assert.deepEqual(result.tags, concatenatedTags);
        return db
          .select("*")
          .from(TABLES.TAGS)
          .where("tag", updatedTagName);
      })
      .then(results => {
        assert.equal(results.length, 1);
      });
  });

  it("GET gets all projects", () => {
    return controller.getProjects().then(results => {
      assert.equal(Array.isArray(results), true);
      assert.equal(results.length, 2);
      assert.deepEqual(results[0].title, projectTitle);
      assert.deepEqual(results[0].body, projectBody);
      assert.deepEqual(results[0].screenshot_url, screenshotUrl);
      assert.deepEqual(results[0].live_url, liveUrl);
      assert.deepEqual(results[0].github_url, githubUrl);
      assert.typeOf(results[0].tags, "array");
    });
  });

  it("DELETE deletes a project", () => {
    return controller.deleteProject(projectId).then(() =>
      controller.getProjectById(projectId).then(result => {
        assert.equal(result, "No projects found");
      })
    );
  });
});
