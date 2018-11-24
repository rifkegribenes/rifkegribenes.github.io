/*
   Route handlers for fetching and updating projects.
*/

/* ================================= SETUP ================================= */

const utils = require("../utils");

// import models
const projects = require("../../db/models/projects");
const tags = require("../../db/models/tags");

/* ============================ HELPER METHODS ============================= */

/** Check a list of tag names against existing tags in DB
 *  Create new tags if they don't already exist.
 *  @param    {Object}   res              HTTP response object
 *  @param    {Array}    tag_names        Array of tag names {String}
 *  @returns  {Array|Object}    Array of tag names
 *                              OR response object with error message
 */

async function checkAndCreateTags(res, tag_names) {
  try {
    const existingTags = await tags.getTagsByTagList(tag_names);

    // add any tags that don't yet exist to the unpersistedTags array
    const unpersistedTags = tag_names.filter(tag => {
      return existingTags.map(p => p.tag).indexOf(tag) === -1;
    });

    // create new tag records in the db for each of the unpersisted tags
    const newTags = await Promise.all(
      unpersistedTags.map(tag => {
        return tags.createTag(tag);
      })
    );

    if (newTags) {
      // if any new tags were created, add them to the persisted tags list
      // and return them
      return existingTags.concat(newTags);
    }

    // otherwise, return existing tags
    return existingTags;
  } catch (err) {
    console.log(`projects.ctrl.js > checkAndCreateTags: ${err}`);
    return utils.handleError(res, err);
  }
}

/** Check a list of tag names against tags in existing project
 *  Remove any tag/project relationships for tags to be deleted.
 *  @param    {Object}   res              HTTP response object
 *  @param    {Array}    submittedTags    Array of tag names {String}
 *  @param    {String}   projectId        Id of existing project to check
 *  @returns  nothing
 */

async function checkAndRemoveTags(res, submittedTags, projectId) {
  try {
    // retrieve existing project by projectId
    const updatedProjectWithTags = await projects.getProjectByIdWithTags(
      projectId
    );

    // save existing tag names from that project to existingTagNames array
    // then retrieve full tag object for each tag name
    const existingTagNames = [...updatedProjectWithTags.tag_names];
    const existingTags = await tags.getTagsByTagList(existingTagNames);

    // check existing tags against list of submitted tags
    // to see if any tags should be removed
    const submittedTagsSet = new Set(submittedTags);
    const tagsToRemove = existingTags.filter(x => !submittedTagsSet.has(x.tag));

    // remove project/tag relationships for each tag to be removed
    return Promise.all(
      tagsToRemove.map(tag => {
        return projects.removeProjectTag(projectId, tag.id);
      })
    );
  } catch (err) {
    console.log(`projects.ctrl.js > checkAndRemoveTags: ${err}`);
    return utils.handleError(res, err);
  }
}

/* ============================ ROUTE HANDLERS ============================= */

/** Create a new project with associated tags
 *  Creates tags if they don't already exist.
 *  @param    {String}   title           Title of the new project.
 *  @param    {String}   body            Body text of the new project.
 *  @param    {String}   screenshot_url  URL of screenshot image.
 *  @param    {String}   live_url        URL to live project.
 *  @param    {String}   github_url      URL of github repo.
 *  @param    {Array}    tag_names       Array of tags {String}
 *  @returns  {Object}                   New project object w/nested tags
 *                                       OR error message
 */
async function createProjectWithTags(req, res, next) {
  const {
    title,
    body,
    screenshot_url,
    live_url,
    github_url,
    tag_names
  } = req.body;
  if (!title || typeof title !== "string") {
    return res.status(500).json({ message: "Project title is required" });
  }

  // if tags are included in post body
  if (tag_names) {
    // check which of submitted tags already exist in database
    try {
      const existingTags = await checkAndCreateTags(res, tag_names);

      // create a new project, including all tag names
      const newProject = await projects.createProject(
        title,
        body,
        screenshot_url,
        live_url,
        github_url,
        existingTags
      );

      const pool = tags => {
        return Promise.all(
          tags.map(tag => {
            // attach all necessary tags to the new project
            return projects.attachProjectTag(newProject.id, tag.id);
          })
        );
      };

      const project = await projects.getProjectByIdWithTags(newProject[0].id);

      return pool(existingTags)
        .then(() => {
          // then return the new project with tags to the client
          return res.status(200).json(project);
        })
        .catch(err => console.error(err));
    } catch (err) {
      console.log(
        `projects.ctrl.js > createProjectWithTags / checkAndCreateTags: ${err}`
      );
      console.dir(err);
      return utils.handleError(res, err);
    }
  } else {
    // if no tag names submitted, just create the new project and return it
    try {
      const project = await projects.createProject(
        title,
        body,
        screenshot_url,
        live_url,
        github_url,
        []
      );
      res.status(200).json(project);
    } catch (err) {
      console.log(
        `projects.ctrl.js > createProjectWithTags / createProject: ${err}`
      );
      return utils.handleError(res, err);
    }
  }
}

/** Update an existing project and associated tags
 *  Create tags if they don't already exist.
 *  Remove existing project/tag relationships if tags not submitted as updates
 *  @param    {String}   id              Id of project to update.
 *  @param    {Object}   updates         Key/value pairs for fields to update.
 ****  @param    {String}   title            Updated project title.
 ****  @param    {String}   body             Updated body text.
 ****  @param    {String}   screenshot_url   Updated screenshot URL.
 ****  @param    {String}   live_url         Updated live URL.
 ****  @param    {String}   github_url       Updated github URL.
 *  @param    {Array}    tag_names        Updated array of tags {String}
 *  @returns  {Object}                   Updated project object w/nested tags
 *                                       OR error message
 */
async function updateProjectWithTags(req, res, next) {
  let { updates, tag_names } = req.body;
  const { id } = req.params;

  // if no updates object submitted, return error message to client
  if (!updates || !Object.keys(updates).length) {
    return res.status(404).json({ message: "No updates submitted" });
  }

  // if no tag names submitted with request body,
  // run an empty array through the tag checker
  if (!tag_names) {
    tag_names = [];
  }

  try {
    // check all submitted tags against exiting tags in the database
    const persistedTags = await checkAndCreateTags(res, tag_names);

    // update the project's other fields in the db
    const updatedProjectArr = await projects.updateProject(id, updates);

    if (!updatedProjectArr || updatedProjectArr.message) {
      return res.status(404).json({
        message:
          updatedProjectArr.message ||
          "An error occured while trying to update this project"
      });
    }

    const pool = persistedTags.map(tag => {
      // attach all tags to the updated project
      // TODO: check first if these tags have already been attached
      return projects.attachProjectTag(id, tag.id);
    });
    Promise.all(pool);

    // remove project/tag relationships from db
    // for any tags that need to be r4emoved
    checkAndRemoveTags(res, tag_names, id);

    // return the updated project (and tags) to the client
    const updatedProjectWithTags = await projects.getProjectByIdWithTags(id);
    return res.status(200).json(updatedProjectWithTags);
  } catch (err) {
    console.log(`projects.ctrl.js > updateProjectWithTags: ${err}`);
    return utils.handleError(res, err);
  }
}

/** Get all projects
 *  @returns  {Array}   Array of project objects w/their nested tags
 *  OR error messsage
 */
const getProjects = (req, res, next) => {
  return projects
    .getAllProjectsWithTags()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

/** Get one project
 *  @param    {String}   projectId   Id of the required project.
 *  @returns  {Object}            Project object w/nested tags
 *  OR error message
 */
const getProjectById = (req, res, next) => {
  return projects
    .getProjectByIdWithTags(req.params.id)
    .then(project => {
      if (project.message || !project) {
        return res.status(404).json({ message: "Project not found" });
      } else {
        res.status(200).json(project);
      }
    })
    .catch(err => res.status(404).json({ message: err.message }));
};

/** Delete project
 *  @param    {String}   projectId   Id of the project to delete.
 *  @returns  Success message or error.
 */
const deleteProject = (req, res, next) => {
  return projects
    .deleteProject(req.params.id)
    .then(result => {
      if (result.message === "Project deleted successfully") {
        return res.status(200).json({ message: result.message });
      } else {
        return res.status(404).json({
          message: "An error occurred and the project was not deleted."
        });
      }
    })
    .catch(err => res.status(404).json({ message: err.message }));
};

/* ================================ EXPORT ================================= */

module.exports = {
  createProjectWithTags,
  updateProjectWithTags,
  getProjects,
  getProjectById,
  deleteProject
};
