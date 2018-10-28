// test/controllers_spec.js
/* globals describe afterEach it beforeEach */

/* ================================= SETUP ================================= */

process.env.NODE_ENV = "testing";

const { assert } = require("chai");
const { db, TABLES } = require("../app/config/knex");
const projects = require("../db/models/projects");
const tags = require("../db/models/tags");
const users = require("../db/models/users");
const projectsCtrl = require("../app/controllers/projects.ctrl");
const usersCtrl = require("../app/controllers/users.ctrl");
const utils = require("../app/utils");

const tagName = "new tag";
const originalTags = [tagName];
const projectTitle = "new project";
const projectTitle2 = "new project2";
const projectBody = "new project body text";
const screenshotUrl = "http://example.com/screenshot.png";
const liveUrl = "http://example.com";
const githubUrl = "http://github.com/rifkegribenes";

const username = "testUserName";
const username1 = "testUserName1";
const email = "test@email.com";
const email1 = "test1@email.com";
const updatedUsername = "updatedUsername";
const updatedEmail = "updatedEmail@email.com";
const github_id = "1234";
const github_token = "5678";

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

    return projectsCtrl
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
    return projectsCtrl.getProjectById(projectId).then(result => {
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

    return projectsCtrl
      .updateProjectWithTags(projectId, updates, updatedTags)
      .then(result => {
        // the updated project should contain all tags included in the updates
        //  plus any pre-existing tags
        const concatenatedTags = [...originalTags, ...updatedTags].filter(
          utils.onlyUnique
        );
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
    return projectsCtrl.getProjects().then(results => {
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
    return projectsCtrl.deleteProject(projectId).then(result => {
      assert.equal(result.message, "Project deleted successfully");
    });
  });
});

describe("users controller tests", () => {
  let userId;
  let userId2;

  // create two users
  beforeEach(() => {
    return users
      .createUser(username, email, github_id, github_token)
      .then(user => {
        userId = user.id;
      })
      .then(() => users.createUser(username1, email1, github_id, github_token));
  });

  // afterEach(() => {
  //   return db(TABLES.USERS)
  //     .del()
  // });

  it("POST creates a new user", () => {
    return usersCtrl
      .createUser(username, email, github_id, github_token)
      .then(results => {
        assert.equal(results[0].username, username);
        assert.equal(results[0].email, email);
        assert.equal(results[0].github_id, github_id);
        assert.equal(results[0].github_token, github_token);
        userId2 = results[0].id;
      });
  });

  it("GET gets one user by id", () => {
    return usersCtrl.getUserById(userId2).then(result => {
      assert.equal(result.username, username);
      assert.equal(result.email, email);
      assert.equal(result.github_id, github_id);
      assert.equal(result.github_token, github_token);
    });
  });

  it("PUT updates a user", () => {
    const updates = {
      email: updatedEmail,
      username: updatedUsername
    };

    return usersCtrl.updateUser(userId2, updates).then(results => {
      assert.equal(results[0].username, updatedUsername);
      assert.equal(results[0].email, updatedEmail);
      assert.equal(results[0].github_id, github_id);
      assert.equal(results[0].github_token, github_token);
    });
  });

  it("GET gets all users", () => {
    return usersCtrl.getUsers().then(results => {
      const arrayOfKeys = key => results.map(obj => obj[key]);
      assert.equal(Array.isArray(results), true);
      assert.include(arrayOfKeys("username"), updatedUsername);
      assert.include(arrayOfKeys("email"), updatedEmail);
      assert.include(arrayOfKeys("username"), username);
      assert.include(arrayOfKeys("email"), email);
      assert.deepEqual(results[0].github_id, github_id);
      assert.deepEqual(results[0].github_token, github_token);
    });
  });

  it("DELETE deletes a user", () => {
    return usersCtrl.deleteUser(userId2).then(result => {
      assert.equal(result.message, "User deleted successfully");
    });
  });
});
