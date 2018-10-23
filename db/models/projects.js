// db/models/projects.js

/* ================================= SETUP ================================= */

const { db, TABLES } = require("../../app/config/knex");

/* ============================ PRIVATE METHODS ============================ */

/** Get array of tags for a specified project ID
 *  @param    {Array}   allProjects   Input array of projects objects
 *  @param    {Number}  projectId     Specific project to return tags for
 *  @returns  {Array}                 Array of tags associated with a project
 */
const getProjectTags = (allProjects, projectId) => {
  return allProjects.reduce((tags, project) => {
    if (project.id === projectId) {
      tags.push(project.tag_name);
    }
    return tags;
  }, []);
};

/** Reduce results array, combining common elements
 *  Knex queries return arrays of results. Joins result in an array of
 *  duplicate projects, where each project is repeated for each tag
 *  associated with it.
 *  @param    {Array}         results   The raw query result set.
 *  @returns  {Array|Object}            Normally an array; obj if only a single project.
 */
const reduceResults = results => {
  const uniqueProjectIds = {};
  const uniqueProjects = [];

  results.forEach(project => {
    if (!uniqueProjectIds[project.id]) {
      uniqueProjectIds[project.id] = true;
      uniqueProjects.push({
        id: project.id,
        title: project.title,
        body: project.body,
        screenshot_url: project.screenshot_url,
        live_url: project.live_url,
        github_url: project.github_url,
        created_at: project.created_at,
        updated_at: project.updated_at,
        tags: getProjectTags(results, project.id)
      });
    }
  });

  return uniqueProjects.length > 1 ? uniqueProjects : uniqueProjects[0];
};

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
    .returning("*");
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
    .returning(["id", "project_id", "tag_id"]);
};

/** Find a project by id; populate its associated tags
 *  @param    {Number}   id   The id of the project we want.
 *  @returns  {Object}        Project plus nested array of tags.
 */
const getProjectByIdWithTags = id => {
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

/** Update a project; populate its associated tags
 *  @param    {Number}   id             Id of the project to update.
 *  @param    {String}   title          Updated project title.
 *  @param    {String}   body           Updated project body text.
 *  @param    {String}   screenshot_url Updated project screenshot_url.
 *  @param    {String}   live_url       Updated project live_url.
 *  @param    {String}   github_url     Updated project github_url.
 *  @returns  {Object}        Project plus nested array of tags.
 */
// const updateProject = (id) => {
//     return db('projects')
//       .where({ id })
//       .update({ email: 'hi@example.com' })
//   }

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
  attachProjectTag,
  getProjectByIdWithTags,
  getAllProjectsWithTags
};
