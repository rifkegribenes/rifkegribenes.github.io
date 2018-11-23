// db/models/projects.js

/* ================================= SETUP ================================= */

const uuid = require("uuid");
const { db, TABLES } = require("../../app/config/knex");
const utils = require("../../app/utils");

/* ============================ PRIVATE METHODS ============================ */

/** Get array of tags for a specified project ID
 *  @param    {Array}   allProjects   Input array of projects objects
 *  @param    {String}  projectId     Specific project to return tags for
 *  @returns  {Array|Object}          Array of tags associated with a project
 *                                    OR object with error message
 */
const getProjectTags = (allProjects, projectId) => {
  return allProjects.reduce((tags, project) => {
    if (project.id === projectId && tags.indexOf(project.tag_name === -1)) {
      tags.push(project.tag_name);
    }
    return tags.filter(utils.onlyUnique);
  }, []);
};

/** Reduce results array, combining common elements
 *  Knex queries return arrays of results. Joins result in an array of
 *  duplicate projects, where each project is repeated for each tag
 *  associated with it.
 *  @param    {Array}         results   The raw query result set.
 *  @returns  {Array|Object}            Array of project objects
 *                                      OR object with error message
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
        tag_names: getProjectTags(results, project.id)
      });
    }
  });
  const returnValue =
    uniqueProjects.length > 0
      ? uniqueProjects
      : { message: "No projects found" };
  return returnValue;
};

/* ============================ PUBLIC METHODS ============================= */

/** Create a project
 *  @param    {String}   title          New project title.
 *  @param    {String}   body           New project body text.
 *  @param    {String}   screenshot_url New project screenshot_url.
 *  @param    {String}   live_url       New project live_url.
 *  @param    {String}   github_url     New project github_url.
 *  @returns  {Array}    Array of 1 newly-created Project object
 *                        OR object with error message
 */
const createProject = (title, body, screenshot_url, live_url, github_url) => {
  return db
    .insert({
      id: uuid.v4(),
      title,
      body,
      screenshot_url,
      live_url,
      github_url
    })
    .into(TABLES.PROJECTS)
    .returning("*")
    .catch(err => {
      return { message: err };
    });
};

/** Attach a tag to a project - via join table,
 *  then update the project's updated_at
 *  @param    {String}   project_id Project id for join table.
 *  @param    {String}   tag_id     Tag id for join table.
 *  @returns  {Array}               Array of 1 newly-created row object
 *                                  OR object with error message
 */

// need to modify this so you can't attach the same tag twice...
const attachProjectTag = (projectId, tagId) => {
  return db
    .insert({ id: uuid.v4(), project_id: projectId, tag_id: tagId })
    .into(TABLES.PROJECTS_TAGS)
    .returning(["id", "project_id", "tag_id"])
    .then(() => {
      return db("projects")
        .where({ id: projectId })
        .update("updated_at", db.fn.now());
    })
    .catch(err => {
      return { message: err };
    });
};

/** Remove a tag from a project - via join table,
 *  then update the project's updated_at
 *  @param    {String}   project_id Project id for join table.
 *  @param    {String}   tag_id     Tag id for join table.
 *  @returns  Success message or error message.
 */
const removeProjectTag = (projectId, tagId) => {
  return db(TABLES.PROJECTS_TAGS)
    .where({ project_id: projectId, tag_id: tagId })
    .del()
    .then(() => {
      return db("projects")
        .where({ id: projectId })
        .update("updated_at", db.fn.now());
    })
    .catch(err => {
      return { message: err };
    });
};

/** Find a project by id; populate its associated tags
 *  @param    {String}   id   The id of the project we want.
 *  @returns  {Object}        Project plus nested array of tags
 *                            OR object with error message
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
    .then(reduceResults)
    .catch(err => {
      return { message: err };
    });
};

/** Update a project
 *  @param    {String}   id         Id of the project to update.
 *  @param    {Object}   updates    Key/value pairs of fields to update.
 ****  @param    {String}   title          Updated project title.
 ****  @param    {String}   body           Updated project body text.
 ****  @param    {String}   screenshot_url Updated project screenshot_url.
 ****  @param    {String}   live_url       Updated project live_url.
 ****  @param    {String}   github_url     Updated project github_url.
 *  @returns  {Object}        Project plus nested array of tags
 *                            OR object with error message
 */
const updateProject = (id, updates) => {
  return db(TABLES.PROJECTS)
    .where({ id })
    .update(updates)
    .update("updated_at", db.fn.now())
    .returning("*")
    .catch(err => {
      console.log(`projects.js > 177`);
      console.dir(err);
      return { message: err };
    });
};

/** Delete a project
 *  (also deletes that project's rows in the join table)
 *  @param    {String}   id         Id of the project to delete.
 *  @returns   success message or error message
 */
const deleteProject = id => {
  // first delete rows in the join table containing that project id
  return (
    db(TABLES.PROJECTS_TAGS)
      .where({ project_id: id })
      .del()
      // then delete the project
      .then(() => {
        db(TABLES.PROJECTS)
          .where({ id })
          .del();
      })
      .then(() => {
        // then return success message to client
        return { message: "Project deleted successfully" };
      })
      .catch(err => {
        return { message: err };
      })
  );
};

/** Get all projects; populate their associated tags
 *  @returns   {Array|Object}   Array of project objects, each w/array of tags
 *                              OR object with error message
 *
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
    .then(reduceResults)
    .catch(err => {
      console.log(`models/projects.js > 233: ${err}`);
      return { message: err };
    });
};

/* ================================ exports ================================ */

module.exports = {
  createProject,
  attachProjectTag,
  removeProjectTag,
  getProjectByIdWithTags,
  updateProject,
  deleteProject,
  getAllProjectsWithTags
};
