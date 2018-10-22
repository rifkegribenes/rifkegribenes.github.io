// test/project_ctrl_spec.js
/* globals describe afterEach it beforeEach */

/* ================================= SETUP ================================= */

process.env.NODE_ENV = 'testing';

const { assert }     = require('chai');
const { db, TABLES } = require('../db/knex');
const projects          = require('../db/models/projects');
const tags         = require('../db/models/tags');
const controller     = require('../controllers/projects_ctrl');

const tagName        = 'new tag';
const projectTitle   = 'new project';
const projectBody    = 'new project body text';
const screenshotUrl  = 'http://example.com/screenshot.png';
const liveUrl        = 'http://example.com';
const githubUrl      = 'http://github.com/rifkegribenes';


/* ================================= TESTS ================================= */

describe('projects controller', () => {

    let projectId;

    // create a tag and 2 projects
    beforeEach(() => {
        return tags.createTag(tagName)
            .then(() => {
                return projects.createProject(projectTitle, projectBody, screenshotUrl, liveUrl, githubUrl);
            })
            .then(([project]) => projectId = project.id)
            .then(() => {
                return projects.createProject(projectTitle, projectBody, screenshotUrl, liveUrl, githubUrl);
            });
    });

    afterEach(() => {
        return db(TABLES.PROJECTS_TAGS).del()
            .then(() => db(TABLES.TAGS).del())
            .then(() => db(TABLES.PROJECTS).del());
    });

    it('creates a new project associated with a list of tags', () => {
        const newProjectTitle = 'second project';
        const newProjectBody  = 'second project body text';
        const newTagName = 'second tag';
        const tags = [tagName, newTagName];

        return controller.createProjectWithTags(newProjectTitle, newProjectBody, screenshotUrl, liveUrl, githubUrl, tags)
            .then((result) => {
                assert.equal(result.title, newProjectTitle);
                assert.deepEqual(result.tags, tags);
                return db
                    .select('*')
                    .from(TABLES.TAGS)
                    .where('tag', tagName);
            })
            .then(results => {
                assert.equal(results.length, 1);
            });
    });

    it('gets all projects', () => {
        return controller.getProjects()
            .then((results) => {
                assert.equal(Array.isArray(results), true);
                assert.equal(results.length, 2);
                assert.deepEqual(results[0].title, projectTitle);
                assert.deepEqual(results[0].body, projectBody);
                assert.deepEqual(results[0].screenshot_url, screenshotUrl);
                assert.deepEqual(results[0].live_url, liveUrl);
                assert.deepEqual(results[0].github_url, githubUrl);
                assert.typeOf(results[0].tags, 'array');
            });
    });

});