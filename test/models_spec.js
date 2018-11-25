// test/models_spec.js
/* globals describe afterEach it beforeEach */

/* ================================= SETUP ================================= */

process.env.NODE_ENV = "testing";

const { assert } = require("chai");
const { db, TABLES } = require("../app/config/knex");
const projects = require("../db/models/projects");
const tags = require("../db/models/tags");
const users = require("../db/models/users");
const utils = require("../app/utils");

const tagName = `new tag ${utils.randomText()}`;
const tagName2 = `new tag ${utils.randomText()}`;
const title1 = "new project";
const title2 = "new project2";
const body = "new project body text";
const screenshot_url = "http://example.com/screenshot.png";
const live_url = "http://example.com";
const github_url = "http://github.com/rifkegribenes";

const updatedProjectTitle = "updated project";
const updatedProjectBody = "updated project body text";
const updatedScreenshotUrl = "http://example.com/updated-screenshot.png";
const updatedLiveUrl = "http://example.com/updated";
const updatedGithubUrl = "http://github.com/rifkegribenes/updated";

const username = "testUserName";
const email = "test@email.com";
const updatedUsername = "updatedUsername";
const updatedEmail = "updatedEmail@email.com";
const github_id = "1234";
const github_token = "5678";

/* ================================= TESTS ================================= */

let id;
let userId;

describe("models tests", () => {
  afterEach(() => {
    return db(TABLES.PROJECTS_TAGS)
      .del()
      .then(() => db(TABLES.TAGS).del())
      .then(() => db(TABLES.PROJECTS).del())
      .then(() => db(TABLES.USERS).del());
  });

  it("POST creates a new project", () => {
    return projects
      .createProject(title1, body, screenshot_url, live_url, github_url)
      .then(([result]) => {
        id = result.id;
        assert.equal(result.title, title1);
        assert.equal(result.body, body);
        assert.equal(result.screenshot_url, screenshot_url);
        assert.equal(result.live_url, live_url);
        assert.equal(result.github_url, github_url);
        return db
          .select("*")
          .from(TABLES.PROJECTS)
          .where({ id });
      })
      .then(([result]) => {
        assert.equal(result.title, title1);
        assert.equal(result.body, body);
        assert.equal(result.screenshot_url, screenshot_url);
        assert.equal(result.live_url, live_url);
        assert.equal(result.github_url, github_url);
      });
  });

  it("POST creates a new tag", () => {
    return tags
      .createTag(tagName)
      .then(result => {
        assert.equal(result.tag, tagName);
        return db.select("*").from(TABLES.TAGS);
      })
      .then(([result]) => {
        assert.equal(result.tag, tagName);
      });
  });

  it("POST creates a new user", () => {
    return users
      .createUser(username, email, github_id, github_token)
      .then(result => {
        assert.deepEqual(result[0].username, username);
        assert.deepEqual(result[0].email, email);
        assert.deepEqual(result[0].github_id, github_id);
        assert.deepEqual(result[0].github_token, github_token);
        return db.select("*").from(TABLES.USERS);
      })
      .then(([result]) => {
        assert.equal(result.username, username);
        assert.equal(result.email, email);
        assert.equal(result.github_id, github_id);
        assert.equal(result.github_token, github_token);
        userId = result.id;
      });
  });

  describe("", () => {
    let projectId;
    let tagId;
    let userId;

    // seed with a tag, 2 projects, and a user before each test
    beforeEach(() => {
      return tags
        .createTag(tagName)
        .then(tag => {
          tagId = tag.id;
          return projects.createProject(
            title2,
            body,
            screenshot_url,
            live_url,
            github_url
          );
        })
        .then(() =>
          projects.createProject(
            title1,
            body,
            screenshot_url,
            live_url,
            github_url
          )
        )
        .then(([project]) => (projectId = project.id))
        .then(() => users.createUser(username, email, github_id, github_token))
        .then(user => {
          userId = user[0].id;
        });
    });

    it("PUT attaches a tag to a project", () => {
      return projects
        .attachProjectTag(projectId, tagId)
        .then(() => {
          return db
            .select("*")
            .from(TABLES.PROJECTS_TAGS)
            .where({
              project_id: projectId,
              tag_id: tagId
            });
        })
        .then(result => assert.equal(result.length, 1));
    });

    it("PUT removes a tag from a project", () => {
      return projects
        .removeProjectTag(projectId, tagId)
        .then(() => {
          return db
            .select("*")
            .from(TABLES.PROJECTS_TAGS)
            .where({
              project_id: projectId,
              tag_id: tagId
            });
        })
        .then(result => assert.equal(result.length, 0));
    });

    it("PUT updates a project when all fields are updated", () => {
      const updates = {
        title: updatedProjectTitle,
        body: updatedProjectBody,
        screenshot_url: updatedScreenshotUrl,
        live_url: updatedLiveUrl,
        github_url: updatedGithubUrl
      };
      return projects
        .updateProject(projectId, updates)
        .then(() => projects.getProjectByIdWithTags(projectId))
        .then(results => {
          assert.equal(results[0].title, updatedProjectTitle);
          assert.equal(results[0].body, updatedProjectBody);
          assert.equal(results[0].screenshot_url, updatedScreenshotUrl);
          assert.equal(results[0].live_url, updatedLiveUrl);
          assert.equal(results[0].github_url, updatedGithubUrl);
          assert.isAbove(results[0].updated_at, results[0].created_at);
        });
    });

    it("PUT updates a user", () => {
      const updates = {
        username: updatedUsername,
        email: updatedEmail
      };
      return users.updateUser(userId, updates).then(results => {
        assert.equal(results[0].email, updatedEmail);
        assert.equal(results[0].username, updatedUsername);
        assert.equal(results[0].github_token, github_token);
        assert.equal(results[0].github_id, github_id);
        assert.isAbove(results[0].updated_at, results[0].created_at);
      });
    });

    it("GET gets one project with all associated tags", () => {
      return projects
        .attachProjectTag(projectId, tagId)
        .then(() => projects.getProjectByIdWithTags(projectId))
        .then(results => {
          assert.equal(results[0].title, title1);
          assert.deepEqual(results[0].tag_names, [tagName]);
        });
    });

    it("GET gets all projects with associated tags", () => {
      return projects
        .attachProjectTag(projectId, tagId)
        .then(() => projects.getAllProjectsWithTags())
        .then(results => {
          const arrayOfKeys = key => results.map(obj => obj[key]);
          assert.equal(Array.isArray(results), true);
          assert.equal(results.length, 2);
          assert.include(arrayOfKeys("title"), title1);
          assert.include(arrayOfKeys("title"), title2);
          assert.deepEqual(results[0].body, body);
          assert.deepEqual(results[0].screenshot_url, screenshot_url);
          assert.deepEqual(results[0].live_url, live_url);
          assert.deepEqual(results[0].github_url, github_url);
          assert.typeOf(results[0].tag_names, "array");
        });
    });

    it("GET gets all users", () => {
      return users.getUsers().then(results => {
        const arrayOfKeys = key => results.map(obj => obj[key]);
        assert.equal(Array.isArray(results), true);
        assert.include(arrayOfKeys("username"), username);
        assert.include(arrayOfKeys("email"), email);
        assert.deepEqual(results[0].github_id, github_id);
        assert.deepEqual(results[0].github_token, github_token);
      });
    });

    it("GET gets one user by id", () => {
      return users.getUserById(userId).then(result => {
        assert.equal(result.username, username);
        assert.equal(result.email, email);
        assert.equal(result.github_id, github_id);
        assert.equal(result.github_token, github_token);
        return db.select("*").from(TABLES.USERS);
      });
    });

    it("DELETE deletes a project", () => {
      return projects.deleteProject(projectId).then(result => {
        assert.equal(result.message, "Project deleted successfully");
      });
    });

    it("DELETE deletes a user", () => {
      return users.deleteUser(userId).then(result => {
        assert.equal(result.message, "User deleted successfully");
      });
    });
  });
});
