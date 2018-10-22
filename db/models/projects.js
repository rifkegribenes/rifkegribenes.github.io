// db/models/projects.js

/* ================================= SETUP ================================= */

const { db, TABLES } = require('../../app/config/knex');


/* ============================ PRIVATE METHODS ============================ */

/** Get array of tags for a specified project ID
 *  @param    {Array}   allProjects   Input array of projects objects
 *  @param    {Number}  projectId     Specific project to return tags for
 *  @returns  {Array}                 Array of tags associated with a project
*/
function getProjectTags (allProjects, projectId) {
    return allProjects.reduce((topics, project) => {
        if (project.id === projectId) {
            tags.push(project.tag_name);
        }
        return tags;
    }, []);
}


/** Reduce results array, combining common elements
 *  Knex queries return arrays of results. Joins result in an array of
 *  duplicate projects, where each project is repeated for each tag
 *  associated with it.
 *  @param    {Array}         results   The raw query result set.
 *  @returns  {Array|Object}            Normally an array; obj if only a single project.
*/
function reduceResults(results) {
    const uniqueProjectIds = {};
    const uniqueProjects   = [];

    results.forEach(post => {
        if (!uniqueProjectIds[project.id]) {
            uniqueProjectIds[project.id] = true;
            uniqueProjects.push({
                id              : project.id,
                title           : project.title,
                body            : project.body,
                screenshot_url  : project.screenshot_url,
                live_url        : project.live_url,
                github_url      : project.github_url,
                created_at      : project.created_at,
                updated_at      : project.updated_at,
                tags            : getPostsTags(results, project.id)
            });
        }
    });

    return uniqueProjects.length > 1 ? uniqueProjects : uniqueProjects[0];
}


/* ============================ PUBLIC METHODS ============================= */

/** Create a project
 *  @param    {String}   title          New project title.
 *  @param    {String}   body           New project body text.
 *  @param    {String}   screenshot_url New project screenshot_url.
 *  @param    {String}   live_url       New project live_url.
 *  @param    {String}   github_url     New project github_url.
 *  @returns  {Array}    Array of 1 newly-created Project object.
*/
const createProject = (title, body, screenshot_url, live_url, github_url) => {
    return db
        .insert({ title, body, screenshot_url, live_url, github_url })
        .into(TABLES.PROJECTS)
        .returning('*');
};

/** Create a user
 *  @param    {String}   username       New user username.
 *  @param    {String}   email          New user email.
 *  @param    {String}   github_id      New user github id.
 *  @param    {String}   github_token   New user github token.
 *  @returns  {Array}    Array of 1 newly-created User object.
*/
const createUser = (username, email, github_id, github_token) => {
    return db
        .insert({ username, email, github_id, github_token })
        .into(TABLES.USERS)
        .returning('*');
};


/** Attach a tag to a project - via join table
 *  @param    {Number}   project_id Project id for join table.
 *  @param    {Number}   tag_id     Tag id for join table.
 *  @returns  {Array}               Array of 1 newly-created row object.
*/
const attachProjectTag = (projectId, tagId) => {
    return db
        .insert({ project_id: projectId, tag_id: tagId })
        .into(TABLES.PROJECTS_TAGS)
        .returning(['id','project_id', 'tag_id']);
};


/** Find a project by id; populate its associated tags
 *  @param    {Number}   id   The id of the project we want.
 *  @returns  {Object}        Project plus nested array of tags.
*/
const getProjectByIdWithTags = (id) => {
    return db
        .select(`${TABLES.PROJECTS}.*`, `${TABLES.TAGS}.tag as tag_name`)
        .from(TABLES.PROJECTS)
        .leftJoin(
            TABLES.PROJECTS_TAGS,
            `${TABLES.PROJECTS_TAGS}.project_id`,
            `${TABLES.PROJECTS}.id`
        )
        .leftJoin(
            TABLES.TAGS,
            `${TABLES.PROJECTS_TAGS}.tag_id`,
            `${TABLES.TAGS}.id`
        )
        .where(`${TABLES.PROJECTS}.id`, id)
        .then(reduceResults);
};


/** Get all projects; populate their associated tags
 *  @returns   {Array}   Array of project objects, each w/array of its tags.
*/
const getAllProjectsWithTags = () => {
    return db
        .select(`${TABLES.PROJECTS}.*`, `${TABLES.TAGS}.tag as tag_name`)
        .from(TABLES.PROJECTS)
        .leftJoin(
            TABLES.PROJECTS_TAGS,
            `${TABLES.PROJECTS_TAGS}.project_id`,
            `${TABLES.PROJECTS}.id`
        )
        .leftJoin(
            TABLES.TAGS,
            `${TABLES.PROJECTS_TAGS}.tag_id`,
            `${TABLES.TAGS}.id`
        )
        .then(reduceResults);
};

/* ================================ exports ================================ */

module.exports = {
    createProject,
    createUser,
    attachProjectTag,
    getProjectByIdWithTags,
    getAllProjectsWithTags
};